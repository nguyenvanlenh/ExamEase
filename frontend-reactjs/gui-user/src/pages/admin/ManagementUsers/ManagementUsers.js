import { Button, Form, Modal, Spinner, Stack, Table } from "react-bootstrap";
import { PaginationComponent } from "../../../components/Pagination/Pagination";
import { DeleteModal, ErrorModal, SuccessModal } from "../../../components/Modal/ModalComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { examService } from "../../../services/examService";
import { RequestData } from "../../../utils/request";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { userService } from "../../../services/userService";

export const Users = () => {
    const [dataUser, setDataUser] = useState([]);
    const teacher = useSelector(state => state.auth)
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [editUserData, setEditUserData] = useState({
        id: '',
        username: '',
        email: '',
        fullname: '',
        active: false
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        const fetching = async () => {
            const response = await userService.getAll(teacher, currentPage, 4);
            setTotalPages(response?.data.totalPage);
            setDataUser(response?.data?.content)
        };

        fetching();
        if (teacher?.userId) {
        }
    }, [currentPage, showSuccessAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!dataUser || dataUser.length === 0) {
                setTimeoutReached(true);
            }
        }, 4500);

        return () => clearTimeout(timer);
    }, [dataUser]);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (user) => {
        if (user) {
            setEditUserData({
                id: user.id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                active: false || user.active
            });
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = async () => {
        const { id, active } = editUserData;
        const response = await userService.updateUser(id, active, teacher);
        console.log(response)
        if (response.status < 400) {
            setShowEditModal(false);
            setCurrentPage(0);
            setShowSuccessAlert(true);
        } else {
            console.error("Error updating user:", response.statusText);
            setShowErrorAlert(true);
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditUserData({
            ...editUserData,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    return (
        <>
            <div className="container pb-0 manage-exam">
                <h2 className="pt-4">Danh sách tài khoản</h2>
                {dataUser && dataUser.length > 0 ? (
                    <Table bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Tài khoản</th>
                                <th>Email</th>
                                <th className="text-center">Loại</th>
                                <th className="text-center">Hoạt động</th>
                                <th className="text-center">Sửa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataUser.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>Lenhnguyen</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        {
                                            user.listRoles.map((r, index) => (
                                                <span key={index} className="badge bg-primary">{r}</span>
                                            ))
                                        }
                                    </td>
                                    <td className="text-center">{user.active ? (
                                        <span className="badge bg-primary">Hoạt động</span>
                                    ) :
                                        (<span className="badge bg-danger">Đã khóa</span>)}</td>
                                    <td className="text-center"><Button variant="link" onClick={() => handleEdit(user)}><EditIcon className="text-primary" /></Button></td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                ) : (
                    timeoutReached ? (
                        <span className="d-flex justify-content-center">
                            Not found
                        </span>
                    ) : (
                        <span className="d-flex justify-content-center">
                            <Spinner animation="border" />
                        </span>
                    )
                )}

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <Form.Group className="mt-2">
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                value={editUserData.id}
                                onChange={handleInputChange}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editUserData.username}
                                onChange={handleInputChange}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mt-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={editUserData.email}
                                onChange={handleInputChange}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                value={editUserData.fullname}
                                onChange={handleInputChange}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Check
                                type="checkbox"
                                label="Hoạt động"
                                name="active"
                                checked={editUserData.active}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
            <SuccessModal show={showSuccessAlert}
                notice={"Đã cập nhật người dùng thành công."}
                onClose={() => setShowSuccessAlert(false)} />
            <ErrorModal show={showErrorAlert}
                notice={"Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại sau."}
                onClose={() => setShowErrorAlert(false)} />

        </>
    )
}