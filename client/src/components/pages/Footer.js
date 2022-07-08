import styled from "styled-components";
import { FaFacebook } from 'react-icons/fa'
import { ImInstagram } from 'react-icons/im'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { ImLocation } from 'react-icons/im'
import { GrMail } from 'react-icons/gr'



  const Container = styled.div`
    display: flex;
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>
          {/* <object type='image/svg+xml' data='SRM1.svg' alt="Sugar Rush Mania">Sugar Rush Mania</object> */}
          </Logo>
          <Desc>
          All made from scratch using the finest ingredients, Sugar Rush Mania offer a vast array of delightful menu items daring to brighten anyone’s day.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <a href="https://www.facebook.com/sugarrushmania/" style={{ color: "white"}}>
              <FaFacebook />
              </a>
            </SocialIcon>
            <SocialIcon color="E4405F">
              <a href="https://www.instagram.com/sugarrushmania/" style={{ color: "white"}}>
              <ImInstagram />
              </a>
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Book Us!</Title>
          <List>
            <ListItem>Wedding</ListItem>
            <ListItem>Baby Shower</ListItem>
            <ListItem>Gender Reveal Party</ListItem>
            <ListItem>Company Party</ListItem>
            <ListItem>Birthday Party</ListItem>
            <ListItem>Graduation Celebration</ListItem>
            <ListItem>Family Reunion</ListItem>
            <ListItem>Surprise Party</ListItem>
            <ListItem>Bachelor/Bachelorrete Party</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
          <ImLocation style={{marginRight:"10px"}}/> San Jose, CA
          </ContactItem>
          <ContactItem>
            <BsFillTelephoneFill style={{marginRight:"10px"}}/> +1 408 430 7662
          </ContactItem>
          <ContactItem>
            <GrMail style={{marginRight:"10px"}}/> info@sugarrushmania.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;