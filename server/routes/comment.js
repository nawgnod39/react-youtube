const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//=================================
//             Comment
//=================================


router.post("/saveComment", (req, res) => {

   const comment = new Comment(req.body) //클라이언트에서불러온 정보를 가져옴. 

    comment.save((err, comment ) => {//몽고디비에 저장을 한 뒤 콜백이온것을 처리.
        if(err) return res.json({ success:false, err})

        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if(err) return res.json({ success:false, err })
            return res.status(200).json({ success:true, result })
            //전체정보를 가져오고싶은데 writer 의 모든 정보는 가져올수가없다. id 밖에없기 때문 
        
            // 따라서  Comment.find({ '_id': comment._id }) 이용후 populate를 사용.
        })

    })

});




module.exports = router;