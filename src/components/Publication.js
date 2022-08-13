import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Publication({ userImage, userName, postTitle, postLink, LinkName, LinkSummary, LinkImg }) {
    const navigate = useNavigate();

    const tagStyle = {
        fontWeight: 700,
        cursor: 'pointer',
        color: 'white',
    };

    function redirect(tag) {
        if (tag.match(/(https?:\/\/[^\s]+)/g)) {
            window.open(tag, '_blank');
        }

        if (tag.match(/#\w+/g)) {
            const hashtagName = tag.match(/#\w+/g)[0].replace('#', '');
            navigate(`/hashtag/${hashtagName}`);
        }
    }

    return (
        
    );
}

