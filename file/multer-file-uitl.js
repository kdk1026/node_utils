/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.06.03
 * @version 1.0
 * @description 파일 업로드 & 다운로드 유틸
 */

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// 파일을 저장할 디렉토리 (없으면 자동으로 생성되지 않으므로 미리 생성해두는 것이 좋습니다.)
const UPLOAD_FILE_PATH = 'uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${UPLOAD_FILE_PATH}/`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uuid = uuidv4();

        const fileName = `${uuid.replace(/-/g, '')}${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = [
        "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
        "hwp", "txt"
    ];

    const allowedMimeTypes = [
        "image/jpeg", "image/png", "image/gif", "image/bmp",
        "application/pdf",
        "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/x-hwp", "application/haansofthwp", "application/vnd.hancom.hwp",
        "text/plain", "application/zip"
    ];

    if ( allowedMimeTypes.includes(file.mimetype) ) {
        cb(null, true);
    } else {
        cb(new Error(`허용되지 않는 파일 형식입니다. (허용: ${allowedExtensions.join(', ')})`), false);
    }
};

const uploadMiddleware = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

/**
 * 파일 업로드
 * @param {string} fieldName 
 * @returns 
 * 
 * @example
 * const app = express();
 * const multerFileUtil = require('./file/multer-file-uitl.js');
 * 
 * app.post('/upload-single', multerFileUtil.uploadFile('myFile'), (req, res) => {
 *  console.log('업로드된 파일:', req.file);
 *  res.status(200).json({
 *      success: true,
 *      message: '파일이 성공적으로 업로드되었습니다.',
 *      fileName: req.file.filename,
 *      originalName: req.file.originalname
 *  });
 * });
 */
const uploadFile = (fieldName) => {
    return (req, res, next) => {
        uploadMiddleware.single(fieldName)(req, res, (err) => {
            if ( err instanceof multer.MulterError ) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ success: false, message: '파일 크기가 너무 큽니다. 최대 10MB까지 허용됩니다.' });
                }
                return res.status(400).json({ success: false, message: `파일 업로드 실패: ${err.message}` });
            } else if (err) {
                return res.status(500).json({ success: false, message: `서버 에러: ${err.message}` });
            }

            if ( !req.file ) {
                return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
            }

            next();
        });
    };
};

/**
 * 파일 다운로드
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {string} saveFileNm 
 * @param {string} originalFileNm 
 * 
 * @example
 * const app = express();
 * const multerFileUtil = require('./file/multer-file-uitl.js');
 * 
 * app.get('/download', (req, res) => {
 *  const { saved, original } = req.query;
 *      if (!saved || !original) {
 *          return res.status(400).json({ success: false, message: '다운로드할 파일 정보가 부족합니다.' });
 *      }
 *  multerFileUtil.downloadFile(req, res, saved, original);
 * });
 */
const downloadFile = (req, res, saveFileNm, originalFileNm) => {
    const filePath = path.join(__dirname, `${UPLOAD_FILE_PATH}`, saveFileNm);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`다운로드할 파일이 없습니다: ${filePath}`, err);
            return res.status(404).json({ success: false, message: '요청한 파일을 찾을 수 없습니다.' });
        }

        res.download(filePath, originalFileNm, (err) => {
            if (err) {
                console.error(`파일 다운로드 중 에러 발생: ${filePath}`, err);
                if ( !res.headersSent ) {
                    res.status(500).json({ success: false, message: '파일 다운로드 중 오류가 발생했습니다.' });
                }
            } else {
                console.log(`파일 다운로드 완료: ${saveFileNm}`);
            }
        });
    });
};

/**
 * 다중 파일 업로드
 * @param {string} fieldName 
 * @param {number} maxCount 
 * @returns 
 * 
 * @example
 * const app = express();
 * const multerFileUtil = require('./file/multer-file-uitl.js');
 * 
 * app.post('/upload-multiple', multerFileUtil.uploadFiles('myFiles', 5), (req, res) => {
 *  console.log('업로드된 파일들:', req.files);
 *  res.status(200).json({
 *      success: true,
 *      message: `${req.files.length}개의 파일이 성공적으로 업로드되었습니다.`,
 *      uploadedFiles: req.files.map(file => ({
 *          fileName: file.filename,
 *          originalName: file.originalname
 *      }))
 *  });
 * });
 */
const uploadFiles = (fieldName, maxCount = 10) => {
    return (req, res, next) => {
        uploadMiddleware.array(fieldName, maxCount)(req, res, (err) => {
            if ( err instanceof multer.MulterError ) {
                if ( err.code === 'LIMIT_FILE_COUNT' ) {
                    return res.status(400).json({ success: false, message: `최대 ${maxCount}개의 파일만 업로드할 수 있습니다.` });
                }
                if ( err.code === 'LIMIT_FILE_SIZE' ) {
                    return res.status(400).json({ success: false, message: '일부 파일의 크기가 너무 큽니다. 최대 10MB까지 허용됩니다.' });
                }
                return res.status(400).json({ success: false, message: `파일 업로드 실패: ${err.message}` });
            } else if (err) {
                return res.status(500).json({ success: false, message: `서버 에러: ${err.message}` });
            }

            if ( !req.files || req.files.length === 0 ) {
                return res.status(400).json({ success: false, message: '파일이 업로드되지 않았습니다.' });
            }

            next();
        });
    };
};

module.exports = {
    uploadFile,
    downloadFile,
    uploadFiles
};