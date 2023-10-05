import multer from 'multer';
import fs from 'fs';

// => configure multer storage and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// => create multer upload instance
const upload = multer({ storage: storage })

// => custom file upload middleware
export const uploadMiddleware = (req, res, next) => {
    // -> use multer upload instance
    upload.array("files", 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }

        // -> Retrieve uploaded files
        const files = req.files
        const errors = [];

        // -> Validate file types and sizes
        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid FIle Type: ${file.originalname}`)
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`)
            }
        })


        // -> Handle validation errors
        if (errors.length > 0) {
            files.forEach((file) => {
                fs.unlinkSync(file.path)
            })

            return res.status(400).json({ errors })
        }

        // -> Attach files to the request object
        req.files = files

        // -> Proceed to the next middleware or route handler
        next()

    })
}




