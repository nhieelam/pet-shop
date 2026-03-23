package com.sgu.happycashierscreen;

import javafx.fxml.FXML;
import javafx.scene.control.*;

import java.io.IOException;

public class LoginController {
    @FXML private TextField usernameField;
    @FXML private PasswordField passwordField;
    @FXML private CheckBox rememberCheckbox;

    private static final String DEMO_USER = "staff";
    private static final String DEMO_PASS = "123456";

    @FXML
    private void handleSignIn() {
        String username = usernameField.getText() != null ? usernameField.getText().trim() : "";
        String password = passwordField.getText() != null ? passwordField.getText() : "";

        if (username.isEmpty() || password.isEmpty()) {
            showAlert(Alert.AlertType.WARNING, "Please enter username and password");
            return;
        }

        if (DEMO_USER.equals(username) && DEMO_PASS.equals(password)) {
            AppState.setStaffUser(username);
            if (rememberCheckbox.isSelected()) {
                AppState.rememberUser(username);
            }
            try {
                AppNavigator.showCashier();
            } catch (Exception e) {
                e.printStackTrace();
                String msg = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
                showAlert(Alert.AlertType.ERROR, "Failed to load cashier screen: " + (msg != null ? msg : e.getClass().getSimpleName()));
            }
        } else {
            showAlert(Alert.AlertType.ERROR, "Invalid username or password");
        }
    }

    private void showAlert(Alert.AlertType type, String message) {
        Alert alert = new Alert(type);
        alert.setTitle("Login");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}
