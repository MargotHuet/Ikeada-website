import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { itemsStore } from "../stores/itemStore";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Stack,
  Badge,
  Modal,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";

const ProductPage = observer(() => {
  // on récupère l'id depuis l'URL créée par le routeur
  const itemId = useParams().productId
  // et l'item depuis le store
  const item = itemsStore.currentItem
  // on vérifie juste si la page à changée (ça évite de boucler)
  useEffect(() => {
    if (itemId) {
      itemsStore.searchItemById(itemId)
    }
  }, [itemId])

  // obligé d'utiliser useEffect pour ne pas appeler map avant que .materials n'existe et causer une erreur
  const [materials, setMaterials] = useState([])
  useEffect(() => {
    if (item.materials) {
      setMaterials(item.materials.map((material) => {
        return (<Badge pill bg="secondary" key={material}>
          {material}
        </Badge>)
      }))
    }
  }, [item.materials])


  const [zoomImg, setZoomImg] = useState(false);
  const handleClose = () => setZoomImg(false);
  const handleShow = () => setZoomImg(true);

  // si on a pas d'image, on met le placeholder
  const picSrc =
    item.picture ||
    "https://www.arqueselectrodiesel.fr/wp-content/uploads/2022/08/photo-non-disponible-1.jpg"
  return (
    <>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "90vh", width: "90vw" }}
        fluid
      >
        <Row>
          <Col>
            <Image
              src={picSrc}
              fluid
              style={{ width: "400px", marginBottom: "20px" }}
              thumbnail
              onClick={handleShow} />
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "25vw" }}>
            <h4>{item.name}</h4>
            <p>{item.desc}</p>
            <ListGroup>
              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                Matériaux :
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="d-flex flex-row justify-content-center"
                >
                  {materials}
                </Stack>
              </ListGroup.Item>
              {/* <ListGroup.Item className='d-flex flex-column justify-content-center align-items-center'>
  Couleurs :
  <Stack direction="horizontal" gap={2} className="d-flex flex-row justify-content-center">
    {item.colors.map((color) => (
      <Badge pill bg="secondary">{color}</Badge>
    ))}
  </Stack>
</ListGroup.Item> */}
            </ListGroup>
          </Col>
          <Col className="d-flex flex-column align-items-center justify-content-center" style={{ width: "25vw" }}>
            <h1>{item.price / 100}€</h1>
            <Button variant="primary" size="lg">
              Acheter
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={zoomImg} onHide={handleClose} animation={false} size="lg">
        <Modal.Body>
          <Image
            src={picSrc}
            fluid
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
})

export default ProductPage