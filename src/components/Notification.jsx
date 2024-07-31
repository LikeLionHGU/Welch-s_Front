import React from 'react';
import PropTypes from 'prop-types';
import '../styles/notification.scss'; // CSS 파일을 생성하여 필요한 스타일을 정의하세요

const Notification = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="noti-modal-container">
            <div className="noti-modal-content">
                <p>{message}</p>
                <div className="noti-modal-actions">
                    <button onClick={onConfirm}>확인</button>
                    <button onClick={onCancel}>취소</button>
                </div>
            </div>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default Notification;
