import React, { useState, useEffect } from 'react';
import { Container, Friend, Wrapper, Image, Badge, Name} from "./ChatOnline.styled"
import axios from "axios";

const MEDIA = process.env.REACT_APP_PUBLIC_MEDIA_FOLDER;

function ChatOnline({ onlineUsers, currentUserId, setChat }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentUserId}`);
            setFriends(res.data);
        };
        getFriends();
    }, [currentUserId]);

    useEffect(() => {
        setOnlineFriends(friends.filter( (friend) => onlineUsers.includes(friend._id) ));
    }, [friends, onlineUsers]);

    const handleClick = async (friend) => {
        try {
            const res = await axios.get(`/conversations/find/${currentUserId}/${friend._id}`);
            setChat(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Container>
            {onlineFriends.map( (friend) => (
                <Friend onClick={() => handleClick(friend)}>
                    <Wrapper>
                        <Image 
                            src={friend?.avatar ? `${MEDIA}/${friend.avatar}` : `${MEDIA}/profile/defaultAvatar.jpg`}
                            alt={friend?.username}
                            title={friend?.username}
                            />
                        <Badge/>
                    </Wrapper>
                    <Name>{friend?.username}</Name>
                </Friend>
            ))}
        </Container>
    )
}

export default ChatOnline
