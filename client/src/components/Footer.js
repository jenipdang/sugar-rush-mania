import styled from "styled-components";


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
          {/* <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc> */}
          {/* <SocialContainer>
            <SocialIcon color="3B5999">
            <i icon="fa-brands fa-facebook" />
            </SocialIcon>
            <SocialIcon color="E4405F">
            <i icon="fa-brands fa-instagram" />
            </SocialIcon>
          </SocialContainer> */}
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
          <i icon="fa-solid fa-location-dot" style={{marginRight:"10px"}}/> San Jose, CA
          </ContactItem>
          <ContactItem>
            <i icon="fa-solid fa-phone" style={{marginRight:"10px"}}/> +1 408 430 7662
          </ContactItem>
          <ContactItem>
            <i icon="fa-solid fa-envelope" style={{marginRight:"10px"}}/> info@sugarrushmania.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;