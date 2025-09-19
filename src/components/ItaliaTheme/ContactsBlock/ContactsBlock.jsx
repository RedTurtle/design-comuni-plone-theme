import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from 'design-react-kit';
import { getContacts } from 'design-comuni-plone-theme/actions';

const ContactsBlock = () => {
  // const { pathname } = useLocation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getContacts(pathname));
  // }, [dispatch, pathname]);

  return (
    <section className="contacts-block bg-light py-5">
      <Container>
        <Row className="d-flex justify-content-center">
          <div className="contacts-box"></div>
        </Row>
      </Container>
    </section>
  );
};

export default ContactsBlock;
