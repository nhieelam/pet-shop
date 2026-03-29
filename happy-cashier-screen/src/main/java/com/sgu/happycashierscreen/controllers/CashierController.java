package com.sgu.happycashierscreen.controllers;

import com.sgu.happycashierscreen.dto.response.ProductResponse;
import com.sgu.happycashierscreen.services.ProductService;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.layout.*;

import java.math.BigDecimal;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

public class CashierController implements Initializable {
    @FXML private Label storeNameLabel;
    @FXML private Label welcomeLabel;
    @FXML private Label dateLabel;
    @FXML private TextField productSearchField;
    @FXML private FlowPane productsGrid;
    @FXML private VBox cartItemsVBox;
    @FXML private Label subtotalLabel;
//    @FXML private Label taxLabel;
    @FXML private Label totalLabel;

    private final List<ProductResponse> allProducts = new ArrayList<>();
    private final Map<UUID, CartItem> cart = new LinkedHashMap<>();

    private record CartItem(ProductResponse product, int quantity) {}

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        dateLabel.setText(new SimpleDateFormat("EEE, MMM d").format(new Date()));
        welcomeLabel.setText(buildWelcomeMessage());

        productSearchField.textProperty().addListener((obs, oldVal, newVal) -> renderProducts());

        loadProductsFromApi();
        updateCartDisplay();
    }

    private String buildWelcomeMessage() {
        var staff = AppState.getStaffUser();
        if (staff == null || staff.getUser() == null) {
            return "Welcome, Staff!";
        }
        var u = staff.getUser();
        String first = u.getFirstName() != null ? u.getFirstName() : "";
        String last = u.getLastName() != null ? u.getLastName() : "";
        String name = (first + " " + last).trim();
        return name.isEmpty() ? "Welcome, Staff!" : "Welcome, " + name + "!";
    }

    private void loadProductsFromApi() {
        new Thread(() -> {
            try {
                List<ProductResponse> list = ProductService.fetchAllProducts();
                Platform.runLater(() -> {
                    allProducts.clear();
                    allProducts.addAll(list);
                    renderProducts();
                });
            } catch (Exception e) {
                Platform.runLater(() -> {
                    new Alert(Alert.AlertType.ERROR,
                            "Failed to load products: " + e.getMessage()).showAndWait();
                });
            }
        }, "load-products").start();
    }

    private List<ProductResponse> filteredProducts() {
        String q = productSearchField != null ? productSearchField.getText() : "";
        if (q == null || q.isBlank()) {
            return new ArrayList<>(allProducts);
        }
        String needle = q.trim().toLowerCase(Locale.ROOT);
        return allProducts.stream()
                .filter(p -> matchesSearch(p, needle))
                .collect(Collectors.toList());
    }

    private boolean matchesSearch(ProductResponse p, String needle) {
        if (p.getId() != null && p.getId().toString().toLowerCase(Locale.ROOT).contains(needle)) {
            return true;
        }
        if (contains(p.getName(), needle)) return true;
        if (contains(p.getDescription(), needle)) return true;
        if (contains(p.getCategoryName(), needle)) return true;
        if (contains(p.getCategoryId(), needle)) return true;
        if (contains(p.getBrand(), needle)) return true;
        if (contains(p.getUnit(), needle)) return true;
        if (p.getPrice() != null && p.getPrice().toPlainString().toLowerCase(Locale.ROOT).contains(needle)) {
            return true;
        }
        return false;
    }

    private boolean contains(String value, String needle) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(needle);
    }

    /** Hiển thị mã sản phẩm (UUID từ server; chưa có SKU riêng trong API). */
    private static String formatProductCode(UUID id) {
        return id != null ? id.toString() : "—";
    }

    private void renderProducts() {
        productsGrid.getChildren().clear();
        for (ProductResponse p : filteredProducts()) {
            VBox card = new VBox(5);
            card.getStyleClass().add("product-card");
            card.setPadding(new Insets(12));
            card.setPrefWidth(160);

            if (!p.isAvailable()) {
                card.setOpacity(0.55);
            }

            Label icon = new Label("📦");
            icon.setStyle("-fx-font-size: 32px;");

            Label codeLabel = new Label("Mã SP:\n" + formatProductCode(p.getId()));
            codeLabel.setWrapText(true);
            codeLabel.setMaxWidth(140);
            codeLabel.setStyle("-fx-font-size: 10px; -fx-text-fill: rgb(107, 114, 128);");

            Label name = new Label(p.getName() != null ? p.getName() : "(no name)");
            name.setWrapText(true);
            name.setMaxWidth(140);
            BigDecimal priceBd = p.getPrice();
            String priceStr = priceBd != null ? String.format("$%.2f", priceBd.doubleValue()) : "—";
            Label price = new Label(priceStr);
            price.setStyle("-fx-font-weight: bold; -fx-text-fill: rgb(234, 88, 12);");

            Label stock = new Label("Stock: " + p.getQuantity());
            stock.setStyle("-fx-font-size: 11px; -fx-text-fill: rgb(107, 114, 128);");
            card.getChildren().addAll(icon, codeLabel, name, price, stock);

            UUID id = p.getId();
            if (id != null && p.isAvailable()) {
                card.setOnMouseClicked(e -> addToCart(id));
            } else {
                card.setOnMouseClicked(e -> { });
            }

            productsGrid.getChildren().add(card);
        }
    }

    private void addToCart(UUID productId) {
        ProductResponse p = allProducts.stream()
                .filter(x -> productId.equals(x.getId()))
                .findFirst()
                .orElse(null);
        if (p == null || !p.isAvailable()) return;
        if (p.getQuantity() <= 0) {
            new Alert(Alert.AlertType.WARNING, "This product is out of stock.").showAndWait();
            return;
        }
        CartItem existing = cart.get(productId);
        int nextQty = existing != null ? existing.quantity + 1 : 1;
        if (nextQty > p.getQuantity()) {
            new Alert(Alert.AlertType.WARNING, "Not enough stock (max " + p.getQuantity() + ").").showAndWait();
            return;
        }
        cart.put(productId, new CartItem(p, nextQty));
        updateCartDisplay();
    }

    private void updateCartDisplay() {
        cartItemsVBox.getChildren().clear();
        for (CartItem item : cart.values()) {
            HBox row = new HBox(10);
            row.getStyleClass().add("cart-item-row");
            row.setAlignment(javafx.geometry.Pos.CENTER_LEFT);
            row.setPadding(new Insets(10));
            Label emoji = new Label("📦");
            emoji.setStyle("-fx-font-size: 20px;");
            VBox info = new VBox(2);
            HBox.setHgrow(info, Priority.ALWAYS);
            Label name = new Label(item.product.getName());
            name.setStyle("-fx-font-weight: bold;");
            Label codeLine = new Label("Mã SP: " + formatProductCode(item.product.getId()));
            codeLine.setStyle("-fx-font-size: 10px; -fx-text-fill: rgb(107, 114, 128);");
            double lineTotal = item.product.getPrice() != null
                    ? item.product.getPrice().doubleValue() * item.quantity
                    : 0;
            Label total = new Label(String.format("$%.2f", lineTotal));
            total.setStyle("-fx-text-fill: rgb(234, 88, 12); -fx-font-weight: bold;");
            info.getChildren().addAll(name, codeLine, total);
            Button minus = new Button("−");
            minus.setOnAction(e -> updateQty(item.product.getId(), -1));
            Button plus = new Button("+");
            plus.setOnAction(e -> updateQty(item.product.getId(), 1));
            Label qty = new Label(String.valueOf(item.quantity));
            qty.setStyle("-fx-font-weight: bold;");
            HBox controls = new HBox(5);
            controls.setAlignment(javafx.geometry.Pos.CENTER);
            controls.getChildren().addAll(minus, qty, plus);
            row.getChildren().addAll(emoji, info, controls);
            cartItemsVBox.getChildren().add(row);
        }
        updateTotals();
    }

    private void updateQty(UUID productId, int delta) {
        CartItem item = cart.get(productId);
        if (item == null) return;
        ProductResponse p = item.product;
        int newQty = item.quantity + delta;
        if (newQty <= 0) {
            cart.remove(productId);
        } else if (p.getQuantity() > 0 && newQty > p.getQuantity()) {
            new Alert(Alert.AlertType.WARNING, "Not enough stock (max " + p.getQuantity() + ").").showAndWait();
            return;
        } else {
            cart.put(productId, new CartItem(p, newQty));
        }
        updateCartDisplay();
    }

    private void updateTotals() {
        double subtotal = cart.values().stream()
                .mapToDouble(i -> i.product.getPrice() != null
                        ? i.product.getPrice().doubleValue() * i.quantity
                        : 0)
                .sum();
        double tax = subtotal * 0.08;
        double total = subtotal + tax;
        subtotalLabel.setText(String.format("$%.2f", subtotal));
//        taxLabel.setText(String.format("$%.2f", tax));
        totalLabel.setText(String.format("$%.2f", total));
    }

    @FXML
    private void processCash() { processPayment("cash"); }

    @FXML
    private void processCard() { processPayment("card"); }

    private void processPayment(String method) {
        if (cart.isEmpty()) {
            new Alert(Alert.AlertType.WARNING, "Cart is empty").showAndWait();
            return;
        }
        for (CartItem item : cart.values()) {
            double unit = item.product.getPrice() != null ? item.product.getPrice().doubleValue() : 0;
            double line = unit * item.quantity;
            AppState.addSale(new AppState.SaleRecord(
                    UUID.randomUUID().toString(),
                    item.product.getName() != null ? item.product.getName() : "",
                    item.quantity,
                    unit,
                    line,
                    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(new Date()),
                    method
            ));
        }
        cart.clear();
        updateCartDisplay();
        new Alert(Alert.AlertType.INFORMATION, "Payment received via " + method + "!").showAndWait();
    }

    @FXML
    private void clearCart() {
        cart.clear();
        updateCartDisplay();
    }

    @FXML
    private void showSalesHistory() throws Exception {
        AppNavigator.showHistory();
    }

    @FXML
    private void showFullHistory() throws Exception {
        AppNavigator.showHistory();
    }

    @FXML
    private void showStaffAccount() {
        var staff = AppState.getStaffUser();
        String msg = staff != null && staff.getUser() != null
                ? staff.getUser().getUsername()
                : "Staff";
        new Alert(Alert.AlertType.INFORMATION, "Staff: " + msg).showAndWait();
    }

    @FXML
    private void handleLogout() throws Exception {
        AppState.setStaffUser(null);
        com.sgu.happycashierscreen.util.ApiClient.clearToken();
        AppNavigator.showLogin();
    }
}
