import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import UserImage from "../../../data/imgs/user_icon.webp"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { DeleteModal } from '../../Modal/ModalComponent';
export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1200);

    const [confirm, setConfirm] = useState(false)
    const navigation = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigation("/login")
    }

    const handleResize = () => {
        setIsOpen(window.innerWidth >= 1200);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Row className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <Col md={12} className="p-0">
                    <div className="sidebar-header">
                        {isOpen ?
                            <>
                                <Image src={UserImage} roundedCircle height={60} />
                                <h3>Admin</h3>
                            </>
                            :
                            <>
                                <Image src={UserImage} roundedCircle height={40} />
                                <h6>Admin</h6>
                            </>
                        }
                    </div>
                    <div className="sidebar-content">
                        <ul className="sidebar-menu">
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/dashboard"
                                    title='Dashboard'>
                                    <span className="icon"><AssessmentIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/exams"
                                    title='Quản lý bài thi'>
                                    <span className="icon"><LibraryBooksIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý bài thi</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/users"
                                    title='Quản lý người dùng'>
                                    <span className="icon"><GroupIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý người dùng</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/reports">
                                    <span className="icon"><ReportIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Báo cáo</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><ImportContactsIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý nhật ký</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><NotificationsActiveIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Thông báo</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><AccountBoxIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Cá nhân</span>
                                </NavLink>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className={`${isOpen ? '' : 'w-100 d-flex justify-content-center'}`}
                                    onClick={() => setConfirm(true)}
                                >
                                    <span className="icon"><LogoutIcon /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Đăng xuất</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-footer">
                        <p>STUDY ADMIN</p>
                    </div>
                </Col>
            </Row>
            <DeleteModal
                show={confirm}
                confirm={"Bạn muốn đăng xuất không"}
                onClose={() => setConfirm(false)}
                handleDelete={handleLogout}
            />
        </>
    );
};