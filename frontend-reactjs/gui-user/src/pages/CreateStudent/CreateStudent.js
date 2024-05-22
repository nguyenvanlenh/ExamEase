import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, ProgressBar, Row, Table, FormControl } from 'react-bootstrap';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { examService } from '../../services/examService';
import { getDataByKeyLS } from '../../utils/common';
import { studentService } from '../../services/studentService';
export const CreateStudent = () => {
    const now = 90;
    const navigate = useNavigate();
    let examSavedId = getDataByKeyLS("examSavedId") ?? 16
    const [codeGroup, setCodeGroup] = useState("")
    const [file, setFile] = useState(null); // State to track selected file

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (file) {
                try {
                    const response = await studentService.createStudent(file, codeGroup);
                    if (response.status === 201) {
                        console.log('File uploaded successfully.');

                        // Call createWorkTime if the student file upload is successful
                        try {
                            const workTimeResponse = await studentService.createWorkTime(examSavedId);
                            if (workTimeResponse.status === 200) {
                                alert(workTimeResponse.message);
                                // navigate('/');
                            } else {
                                alert('Failed to create WorkTime. Please try again.');
                            }
                        } catch (error) {
                            console.error('Error creating WorkTime:', error);
                            alert('An error occurred while creating WorkTime. Please try again.');
                        }
                    } else {
                        alert('Failed to upload file. Please try again.');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('An error occurred while uploading the file. Please try again.');
                }
            } else {
                alert('Please select a file.');
            }
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await examService.getExamById(examSavedId);
    //         if (data?.status < 400) {
    //             console.table(data.data);
    //             setCodeGroup(data.data.codeGroup);
    //         } else {
    //             console.table(data.data)
    //         }
    //     };

    //     fetchData();
    // }, [examSavedId]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await studentService.createWorkTime(examSavedId);
            if (data?.status < 400) {
                console.table(data.data);
                setCodeGroup(data.data.codeGroup);
            } else {
                console.table(data.data)
            }
        };

        fetchData();
    }, [examSavedId]);

    return (
        <>
            <Header />
            <div id="form-question" className="pt-5 pb-5">
                <div className="container">
                    <ProgressBar animated now={now} label={`${now}%`} className="mr-1 mb-4" />
                    <h1 className="text-center mb-4">Thêm danh sách học sinh</h1>
                    <h4>Hướng dẫn</h4>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
                        <p>Người dùng tạo file excel(.xlsx) có các cột như sau:</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>MSSV</th>
                                    <th>Fullname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nguyễn Văn Lênh</td>
                                    <td>20130303@st.hcmuaf.edu.vn</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Nguyễn Dư Lập</td>
                                    <td>20130302@st.hcmuaf.edu.vn</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p>
                            Sau khi tạo thành công file excel với đầy đủ các thông tin trên thì hãy nhấn vào nút "Chọn
                            File" bên dưới và tiến hành tải file lên.
                        </p>
                        <p>Sau khi tải lên hãy nhấn nút "Thêm học sinh".</p>
                        <p>
                            <strong>Lưu ý: </strong>Chỉ được tải lên file excel với đúng định dạng như trên hệ thống
                            mới xử lý thành công.
                        </p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Tải lên danh sách học sinh:</Form.Label>
                        <InputGroup className="mb-3">
                            <FileUploadIcon style={{ fontSize: "38px" }} />
                            <FormControl
                                type="file"
                                onChange={handleFileChange}
                                aria-label="Text input with file selection"
                                // isInvalid={!file} // Use isInvalid to provide validation feedback
                                required
                            />
                            <Form.Control.Feedback type="invalid">Bạn cần phải chọn file excel</Form.Control.Feedback>
                        </InputGroup>
                        <Row>
                            <Col md={6}>
                                <Button
                                    type="button"
                                    className="w-100 ml-5 mr-5 mt-5"
                                    variant="outline-secondary"
                                    onClick={() => navigate('/')}
                                >
                                    Quay lại
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Button
                                    type="submit"
                                    className="w-100 ml-5 mr-5 mt-5"
                                    variant="outline-success"
                                    disabled={!file} // Disable button if file is not selected
                                >
                                    Thêm học sinh
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
};
