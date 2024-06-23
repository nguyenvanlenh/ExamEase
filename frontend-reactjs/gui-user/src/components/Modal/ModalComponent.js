import { Button, Modal } from "react-bootstrap";
import SendIcon from '@mui/icons-material/Send';
export const SuccessModal = ({ show, notice, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notice}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const ErrorModal = ({ show, notice, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Lỗi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notice}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export const DeleteModal = ({ show, confirm, onClose, handleDelete }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{confirm}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Không
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Có
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export const SendMailModal = ({ show, notice, onClose, handleSendMail }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Gửi kết quả cho học sinh</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {notice}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Thoát
                </Button>
                <Button variant="primary" onClick={handleSendMail}>
                    Gửi<SendIcon />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};