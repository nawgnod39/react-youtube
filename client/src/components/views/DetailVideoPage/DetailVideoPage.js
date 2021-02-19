import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography } from 'antd';
import axios from 'axios';

function DetailVideoPage(props) {


    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)//videoVariable 을 생성해야 아이디를 보내고 데이터를 가져올수있음 .
            .then(response => {
                if (response.data.success) {//성공을 하면  useState 에 저장을한다.  const [Video, setVideo] = useState([])
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])


    return (//없을
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

            <List.Item
                actions={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={Video.writer && Video.writer.image} />}//유저의 이미지 
                    title={<a href="https://ant.design">{Video.title}</a>}
                    description={Video.description}
                />
                <div></div>
            </List.Item>

        </div>
    )
}

export default DetailVideoPage