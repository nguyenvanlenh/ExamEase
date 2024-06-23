import { useEffect, useState } from "react";
import { Button, Spinner, Table, Modal, Form, Pagination, Stack } from "react-bootstrap";
import { examService } from "../../../services/examService";
import { formatDate, formatDateLocal, getDataByKeyLS, setDataByKeyLS } from "../../../utils/common";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";
import '../../ManagementExams/ManagementExams.scss'
import { categoryService } from "../../../services/categoryService";
import { timeExamService } from "../../../services/timeExamService";
import { RequestData } from "../../../utils/request";
import { PaginationComponent } from "../../../components/Pagination/Pagination";
import { DeleteModal, ErrorModal, SuccessModal } from "../../../components/Modal/ModalComponent";


export const Exams = () => {
    const [dataExam, setDataExam] = useState([]);
    const [teacher, setTeacher] = useState(getDataByKeyLS("auth"));
    const [timeoutReached, setTimeoutReached] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [examIdToDelete, setExamIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [editExamData, setEditExamData] = useState({

        title: '',
        shortDescription: '',
        description: '',
        timeExam: '',
        category: '',
        startTime: '',
        endTime: '',
        public: false
    });

    const [listCate, setListCate] = useState(getDataByKeyLS("category"))
    const [listTime, setListTime] = useState(getDataByKeyLS("timeExam"))

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);


    useEffect(() => {
        const fetching = async () => {
            if (!getDataByKeyLS("category")) {
                const categoryData = await categoryService.getAll()
                setListCate(categoryData?.data)
                setDataByKeyLS("category", categoryData?.data)
            }
            if (!getDataByKeyLS("timeExam")) {
                const timeExamData = await timeExamService.getAll()
                setListTime(timeExamData?.data)
                console.log(timeExamData?.data);
                setDataByKeyLS("timeExam", timeExamData?.data)
            }
        };
        fetching();
    }, []);
    useEffect(() => {
        const fetching = async () => {
            const response = await examService.getAllExams(currentPage);
            setDataExam(response?.data.content);
            setTotalPages(response?.data.totalPage);
        };

        fetching();
        if (teacher?.userId) {
        }
    }, [currentPage, showSuccessAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!dataExam || dataExam.length === 0) {
                setTimeoutReached(true);
            }
        }, 4500);

        return () => clearTimeout(timer);
    }, [dataExam]);

    const handleDelete = async () => {
        await examService.deleteExamById(examIdToDelete);
        setShowDeleteModal(false);
        setDataExam(dataExam.filter(exam => exam.id !== examIdToDelete));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (exam) => {
        if (exam) {
            const categoryId = listCate.find(category => category.name === exam.category)?.id || '';
            const timeExamId = listTime.find(time => time.name === exam.timeExam)?.id || '';
            setEditExamData({
                id: exam.id,
                title: exam.title || '',
                shortDescription: exam.shortDescription || '',
                description: exam.description || '',
                timeExam: timeExamId,
                category: categoryId,
                startTime: exam.startTime || '',
                endTime: exam.endTime || '',
                isPublic: exam.public || false
            });
            setShowEditModal(true);
        }
    };

    const handleSaveEdit = async () => {
        const { id, title, shortDescription, description, timeExam, category, startTime, endTime, isPublic } = editExamData;
        const request = RequestData().ExamRequest(1, title, shortDescription, description, 1, timeExam, category, formatDateLocal(startTime), formatDateLocal(endTime), isPublic, [], []);
        const response = await examService.updateExam(id, request);
        if (response.status < 400) {
            setShowEditModal(false);
            setCurrentPage(0);
            setShowSuccessAlert(true);
        } else {
            console.error("Error updating exam:", response.statusText);
            setShowErrorAlert(true);
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditExamData({
            ...editExamData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <>
            <div className="container pb-0 manage-exam">
                <h2>Danh sách đề thi</h2>
                <Stack direction="horizontal" className="mb-3" gap={3}>
                    <Link className="btn text-danger btn-outline-danger p-2" to="/admin/create-exam"
                    >
                        Thêm đề thi</Link>
                    <Button variant="outline-success" className="p-2"
                    >
                        Xuất file Excel</Button>
                </Stack>
                {dataExam && dataExam.length > 0 ? (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th>Tên đề</th>
                                <th className="text-center">Sửa</th>
                                <th className="text-center">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataExam.map((exam) => (
                                <tr key={exam.id}>
                                    <td><Link to={"/admin/question"} state={exam.id}>{exam.codeGroup}</Link></td>
                                    <td>{exam.title}</td>
                                    <td className="text-center"><Button variant="link" onClick={() => handleEdit(exam)}><EditIcon className="text-primary" /></Button></td>
                                    <td className="text-center">
                                        <Button variant="link" onClick={() => { setShowDeleteModal(true); setExamIdToDelete(exam.id); }}>
                                            <DeleteForeverIcon className="text-danger" />
                                        </Button>
                                    </td>
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
                    <Modal.Title>Chỉnh sửa đề thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group>
                                <Form.Label>Tiêu đề</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    name="title"
                                    value={editExamData.title}
                                    onChange={handleInputChange}
                                />
                            </Form.Group></div>
                        <div className="col-md-6">

                            <Form.Group>
                                <Form.Label>Mô tả ngắn</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="shortDescription"
                                    value={editExamData.shortDescription}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={editExamData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Thời gian thi</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    required
                                    onChange={(e) => setEditExamData({ ...editExamData, timeExam: e.target.value })}
                                    value={editExamData.timeExam}
                                >
                                    {listTime?.map(time => (
                                        <option key={time.id} value={time.id}>{time.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <div className="col-md-6">
                            <Form.Group>
                                <Form.Label>Danh mục</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    required
                                    onChange={(e) => setEditExamData({ ...editExamData, category: e.target.value })}
                                    value={editExamData.category}
                                >
                                    {listCate?.map(cate => (
                                        <option key={cate.id} value={cate.id}>{cate.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Hạn từ</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="startTime"
                                    min={formatDateLocal(new Date())}
                                    value={formatDateLocal(editExamData.startTime)}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Hạn đến</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="endTime"
                                    min={formatDateLocal(new Date())}
                                    value={formatDateLocal(editExamData.endTime)}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Công khai"
                                    name="public"
                                    checked={editExamData.isPublic}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
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
                notice={"Đã cập nhật đề thi thành công."}
                onClose={() => setShowSuccessAlert(false)} />
            <ErrorModal show={showErrorAlert}
                notice={"Đã xảy ra lỗi khi cập nhật đề thi. Vui lòng thử lại sau."}
                onClose={() => setShowErrorAlert(false)} />
            <DeleteModal
                show={showDeleteModal}
                confirm={"Bạn muốn xóa bài thi này?"}
                onClose={() => setShowDeleteModal(false)}
                handleDelete={handleDelete}
            />

        </>
    );
};
