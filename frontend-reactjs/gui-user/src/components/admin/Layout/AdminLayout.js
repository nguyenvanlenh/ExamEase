import { Col, Container, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../Sidebar/Sidebar"

export const AdminLayout = () => {
    return (
        <Container fluid>
            <Row>
                <Col sm={2} xs={1}>
                    <Sidebar />
                </Col>
                <Col sm={10} xs={11}>
                    <Container fluid>
                        <Outlet />
                    </Container>
                </Col>
            </Row>

        </Container>
    )
}