<?php


    function write_language_login_script() {
?>
    <script type="text/javascript">
        var getLanguage = function(text, value2){
            switch (language) {
                case "VN":
                    switch (text) {
                        case "login_your_account":
                            text = "Đăng nhập vào tài khoản của bạn";
                            break;
                        case "username":
                            text = "Tên đăng nhập";
                            break;
                        case "password":
                            text = "Mật khẩu";
                            break;
                        case "forgot_password":
                            text = "Quên mật khẩu?";
                            break;
                        case "rememberme":
                            text = "Duy trì đăng nhập";
                            break;
                        case "login":
                            text = "Đăng nhập";
                            break;
                        case "old_password":
                            text = "Mật khẩu cũ";
                            break;
                        case "first_login":
                            text = "Đây là lần đăng nhập đầu tiên, vui lòng đổi mật khẩu của bạn để đảm bảo tính bảo mật.";
                            break;
                        case "new_password":
                            text = "Mật khẩu mới";
                            break;
                        case "confirm_password":
                            text = "Xác nhận mật khẩu";
                            break;
                        case "username_pass_is_empty":
                            text = "Tên đăng nhập và mật khẩu không được để trống!";
                            break;
                        case "password_incorrect":
                            text = "Mật khẩu không đúng";
                            break;
                        case "logged":
                            text = "Tài khoản này đã được đăng nhập";
                            break;
                        case "user_not_available":
                            text = "Tài khoản này đã ngừng hoạt động, để biết thêm chi tiết, vui lòng liên hệ ban quản trị";
                            break;
                        case "username_incorrect":
                            text = "Tên đăng nhập không đúng";
                            break;
                        case "password_not_match":
                            text = "Xác nhận mật khẩu không khớp";
                            break;
                        case "save":
                            text = "Lưu";
                            break;
                        case "send":
                            text = "Gửi";
                            break;
                        case "email_invalid":
                            text = "Email không hợp lệ";
                            break;
                        case "invalid":
                            text = "không hợp lệ";
                            break;
                        case "reinput_email":
                            text = "Nhập lại email";
                            break;
                        case "not_existed_email":
                            text = "Không tồn tại email " + value2 + " trong hệ thống."
                            break;
                        case "type_your_email":
                            text = "Nhập địa chỉ email của bạn."
                            break;
                        case "please_type_your_email":
                            text = "Vui lòng nhập email của bạn"
                            break;
                        case "resend":
                            text = "Gửi lại"
                            break;
                        case "An_email_with_link_has_been_sent_to_the_address":
                            text = "Một email với đường link đã được gửi tới địa chỉ"
                            break;
                        case "please_check_the_inbox_and_click_the_link_provided_to_reset_password":
                            text = "bạn vui lòng kiểm tra hộp thư và nhấp chuột vào đường link này để thiết lập lại mật khẩu."
                            break;
                        case "If_you_don't_find_an_email_in_the_Inbox,_please_check_Junk_mail_box,_Spam_mail_box":
                            text = "Nếu không thấy email trong Inbox, bạn kiểm tra trong hộp thư Junk mail, spam mail hoặc hộp thư mail rác."
                            break;
                        case "If_you_still_don't_receive_the_email,_please_click_the_button_below_to_resend_email":
                            text = "Nếu vẫn không thấy email bạn có thể yêu cầu gửi lại email."
                            break;
                        case "click_login":
                            text = "Trình duyệt sẽ chuyển sang trang \"Đăng nhập \" trong 5 giây.  Click ";
                            break;
                        case "here":
                            text = "vào đây";
                            break;
                        case "if_wait_long_time":
                            text = " nếu bạn cảm thấy đợi lâu.";
                            break;
                        case "link_expired":
                            text = "Link để thay đổi mật khẩu đã hết hạn, bạn nhập lại email để thay đổi mật khẩu";
                            break;

                    }
                    break;
                case "EN":
                    switch (text) {
                        case "login_your_account":
                            text = "Login to your account";
                            break;
                        case "username":
                            text = "Username";
                            break;
                        case "password":
                            text = "Password";
                            break;
                        case "forgot_password":
                            text = "Forgot password?";
                            break;
                        case "rememberme":
                            text = "Keep me signed in";
                            break;
                        case "login":
                            text = "Login";
                            break;
                        case "old_password":
                            text = "Old password";
                            break;
                        case "first_login":
                            text = "Please change your password upon first time login for security";
                            break;
                        case "new_password":
                            text = "New password";
                            break;
                        case "confirm_password":
                            text = "Confirm password";
                            break;
                        case "username_pass_is_empty":
                            text = "Username and password can not left blank!";
                            break;
                        case "password_incorrect":
                            text = "Password is incorrect";
                            break;
                        case "logged":
                            text = "Account was logged";
                            break;
                        case "user_not_available":
                            text = "This account has been deactived, for more information, please contact admin";
                            break;
                        case "username_incorrect":
                            text = "Username is incorrect";
                            break;
                        case "password_not_match":
                            text = "Password not match";
                            break;
                        case "save":
                            text = "Save";
                            break;
                        case "send":
                            text = "Send";
                            break;
                        case "email_invalid":
                            text = "Invalid email format";
                            break;
                        case "invalid":
                            text = "invalid";
                            break;
                        case "reinput_email":
                            text = "Retype email";
                            break;
                        case "not_existed_email":
                            text = "Email " + value2 + " does not exist in the system."
                            break;
                        case "resend":
                            text = "Resend"
                            break;
                        case "An_email_with_link_has_been_sent_to_the_address":
                            text = "An email with link has been sent to the address"
                            break;
                        case "please_check_the_inbox_and_click_the_link_provided_to_reset_password":
                            text = "please check the inbox and click the link provided to reset password."
                            break;
                        case "If_you_don't_find_an_email_in_the_Inbox,_please_check_Junk_mail_box,_Spam_mail_box":
                            text = "If you don't find an email in the Inbox, please check Junk mail box, Spam mail box."
                            break;
                        case "If_you_still_don't_receive_the_email,_please_click_the_button_below_to_resend_email":
                            text = " If you still don't receive the email, please click the button below to resend email."
                            break;
                        case "click_login":
                            text = "The browser will direct to page \"Login\" in 5 seconds. Click ";
                            break;
                        case "here":
                            text = "here";
                            break;
                        case "if_wait_long_time":
                            text = " if you do not want to wait.";
                            break;
                        case "link_expired":
                            text = "Link to change password has expired. Please re-enter your email to change password.";
                            break;

                    }
                    break;

            }
            return text;
        };
    </script>
<?php
    }
?>
