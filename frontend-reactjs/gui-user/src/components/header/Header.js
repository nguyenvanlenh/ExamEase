import "./header.scss";
import React, { useEffect, useState } from 'react'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import imgAccount from '../../data/imgs/user_icon.webp'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAuth } from "../../redux/slices/authSlice";
import { removexamWorked } from "../../redux/slices/examWorkedSlice";
import { removeQuestion } from "../../redux/slices/listQuestionSlice";
import { getDataByKeyLS } from "../../utils/common";
import { ROLE_TEACHER } from "../../utils/constants";
import { removeExamRequest } from "../../redux/slices/examSlice";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuNoneLoginOpen, setIsMenuNoneLoginOpen] = useState(false);
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleMenuNoneLogin = () => {
        setIsMenuNoneLoginOpen(!isMenuNoneLoginOpen)
    }
    const auth = useSelector(state => state.auth)
    const isAuthEmpty = Object.keys(auth).length !== 0;
    const handleLogOut = () => {
        dispatch(removeAuth())
        dispatch(removexamWorked())
        dispatch(removeQuestion())
        dispatch(removeExamRequest())
        localStorage.clear()
        setIsMenuOpen(false)
        navigation("/login")
    }
    const [currentRoles, setCurrentRoles] = useState([]);
    const [isRole, setIsRole] = useState(false);

    useEffect(() => {
        const getRoles = () => {
            const authData = getDataByKeyLS("auth");
            return authData?.listRoles || [];
        };
        setCurrentRoles(getRoles());
    }, []);

    useEffect(() => {
        setIsRole(currentRoles.some(role => role === ROLE_TEACHER));
    }, [currentRoles]);

    return (
        <>
            <div id="id-header" style={{ height: isMenuOpen ? 'auto' : '64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="p-2 fs-2 fw-bold">
                        <Link className="text-dark" to={"/home"}>Study</Link>
                    </div>
                    <div className="content">
                        <div className="p-3 ms-auto">
                            <Link to={"/home"} className="text-item">Cộng đồng</Link>
                        </div>
                        <div className="p-3">
                            <Link to="/list-exams" className="text-item">Đề thi online</Link>
                        </div>
                        <div className="p-3">
                            <Link to={"/home"} className="text-item">Liên hệ</Link>
                        </div>
                        <div className="p-3">
                            {
                                isAuthEmpty ? (
                                    <NavDropdown className="text-item"
                                        title={<span><img className="img-account"
                                            src={imgAccount} alt="Avatar" /></span>}
                                        id="basic-nav-dropdown">
                                        <NavDropdown.ItemText style={{ color: '#8c98a4', fontWeight: 600 }}>Thông báo</NavDropdown.ItemText>
                                        <NavDropdown.ItemText style={{ width: '250px', fontSize: '14px' }}>Bạn chưa có thông báo mới.</NavDropdown.ItemText>
                                        {isRole ? <>
                                            <NavDropdown.ItemText style={{ width: '250px', fontSize: '14px' }}>
                                                <Link to="/create-exam" className="text-item">Tạo bài thi</Link>
                                            </NavDropdown.ItemText>
                                            <NavDropdown.ItemText style={{ width: '250px', fontSize: '14px' }}>
                                                <Link to="/manage-exam" className="text-item">Quản lý đề thi</Link>
                                            </NavDropdown.ItemText></> : null}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="account">Trang cá nhân</NavDropdown.Item>
                                        <NavDropdown.ItemText onClick={handleLogOut}>Đăng xuất</NavDropdown.ItemText>
                                    </NavDropdown>
                                ) :
                                    (<Link to={"/login"} className="btn-login btn">Đăng nhập</Link>)
                            }

                        </div>
                    </div>
                    {
                        isAuthEmpty ? (<div className="container-menu" onClick={handleMenuToggle}>
                            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                        </div>) : (<Button className="container-menu btn-login-menu"><Link to={"/login"}>Đăng nhập</Link></Button>)
                    }
                    {
                        isAuthEmpty || (<div className="container-menu" onClick={handleMenuNoneLogin}>
                            <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                        </div>)
                    }

                </div>
                <div className={`content-menu-mobile`} style={{ backgroundColor: "#ffffff", display: isMenuNoneLoginOpen ? 'block' : 'none' }}>
                    <div className="p-2 ms-auto">
                        <Link to={"/login"} className="text-item">Đăng nhập</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/register" className="text-item">Đăng kí</Link>
                    </div>
                </div>
                <div className={`content-menu-mobile`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
                    <div className="p-2 ms-auto">
                        <Link to="/home" className="text-item">Cộng đồng</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/list-exams" className="text-item">Đề thi online</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/manage-exam" className="text-item">Quản lý đề thi</Link>
                    </div>
                    <div className="p-2">
                        <Link to="#home" className="text-item">Liên hệ</Link>
                    </div>
                    <div className="p-2">
                        <Link to="#home" className="text-item">Trang cá nhân</Link>
                    </div>
                    {isRole ? <>
                        <div className="p-2">
                            <Link to="/create-exam" className="text-item">Tạo đề thi</Link>
                        </div>
                        <div className="p-2">
                            <Link to="/manage-exam" className="text-item">Quản lý đề thi</Link>
                        </div>
                    </> : null
                    }
                    <div className="p-2">
                        <Link onClick={handleLogOut} className="text-item">Đăng xuất</Link>
                    </div>
                </div>
            </div>
            <div style={{ height: '64px' }}></div>
        </>

    )
}

export default Header
