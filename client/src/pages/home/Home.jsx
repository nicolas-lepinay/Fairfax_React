// 🌌 React :
import { useState, useEffect, useContext } from 'react';

// 💅🏻 Styled components :
import { Wrapper, Container, Banner, Image, Bottom, Background, Overlay, Logo, Introduction } from "./Home.styled"

// 🚧 React Component :
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";

// 🦸‍♀️ User Context :
import { UserContext } from "../../context/UserContext"

export default function Home({ socket }) {

    const ASSETS = process.env.REACT_APP_PUBLIC_ASSETS_FOLDER;
    const { user, setUser } = useContext(UserContext);

    return ( 
        <>
            {/* <Topbar socket={socket}/> */}
            <Wrapper>
                {/* <Sidebar/> */}
                <Navbar socket={socket} hidden={false} />

                <Container>
                    <Banner>
                        <Logo src={`${ASSETS}/logo_gold.png`} />
                        <Overlay src={`${ASSETS}/fog_lg.png`}/>
                        {/* <Background></Background> */}
                        <Image src={`${ASSETS}/home/banner_3.png`} />
                        <Bottom src={`${ASSETS}/wave_white.png`} />
                    </Banner>

                    <Introduction>
                        <h1>About</h1>
                        <h4>Welcome to a magical world</h4>
                        <hr/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p>
                        <br/>
                        <p>Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.</p>
                    </Introduction>

                    <h1>Test</h1>


                </Container>

                {/* <Feed socket={socket}/> */}
                {/* <Rightbar/> */}
            </Wrapper>
        </>
    )
}