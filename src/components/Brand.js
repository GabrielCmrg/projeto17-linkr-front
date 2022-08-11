import styled from "styled-components";

export default function Brand() {
    return (
        <BrandContainer>
            <div>
                <h1>Linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </div>
        </BrandContainer>
    )
};

const BrandContainer = styled.div`
    background-color: #151515;
    height: 100%;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;
    flex-shrink: 0;

    h1 {
        font-size: 106px;
        font-family: 'Passion One', cursive;
    }

    h2 {
        font-size: 43px;
        font-family: 'Oswald', sans-serif;
        width: 442px;
    }

    @media (max-width: 800px) {
        width: 100%;
        height: initial;
        padding: 27px;

        h1 {
            font-size: 76px;
        }

        h2 {
            font-size: 23px;
            width: 237px;
        }
    }
`;