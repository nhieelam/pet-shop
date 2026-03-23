package com.sgu.happycashierscreen;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.text.FontWeight;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

public class CashierController implements Initializable {
    @FXML private Label storeNameLabel;
    @FXML private Label welcomeLabel;
    @FXML private Label dateLabel;
    @FXML private HBox categoryBox;
    @FXML private FlowPane productsGrid;
    @FXML private VBox cartItemsVBox;
    @FXML private Label subtotalLabel;
    @FXML private Label taxLabel;
    @FXML private Label totalLabel;

    private static final String[] CATEGORIES = {"all", "food", "toys", "accessories", "health", "grooming"};
    private static final String[] CATEGORY_LABELS = {"🏠 All", "🍖 Food", "🎾 Toys", "🎀 Accessories", "💊 Health", "✨ Grooming"};

    private static final Product[] PRODUCTS = {
            new Product(1, "Premium Dog Food", 45.99, "food", "🐕"),
            new Product(2, "Cat Kibble Deluxe", 32.99, "food", "🐱"),
            new Product(3, "Bird Seed Mix", 12.99, "food", "🐦"),
            new Product(4, "Fish Flakes", 8.99, "food", "🐠"),
            new Product(5, "Squeaky Ball", 6.99, "toys", "🎾"),
            new Product(6, "Catnip Mouse", 4.99, "toys", "🐭"),
            new Product(7, "Rope Chew Toy", 9.99, "toys", "🪢"),
            new Product(8, "Feather Wand", 7.99, "toys", "🪶"),
            new Product(9, "Dog Collar", 15.99, "accessories", "🎀"),
            new Product(10, "Cat Bed", 29.99, "accessories", "🛏️"),
            new Product(11, "Pet Carrier", 49.99, "accessories", "👜"),
            new Product(12, "Food Bowl Set", 18.99, "accessories", "🥣"),
            new Product(13, "Flea Treatment", 24.99, "health", "💊"),
            new Product(14, "Vitamins", 19.99, "health", "🧴"),
            new Product(15, "Pet Shampoo", 11.99, "grooming", "🧴"),
            new Product(16, "Brush Set", 14.99, "grooming", "🪮"),
            new Product(17, "Nail Clippers", 9.99, "grooming", "✂️"),
            new Product(18, "Hamster Food", 7.99, "food", "🐹"),
    };

    private final Map<Integer, CartItem> cart = new LinkedHashMap<>();
    private String currentCategory = "all";

    record Product(int id, String name, double price, String category, String emoji) {}
    record CartItem(Product product, int quantity) {}

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        dateLabel.setText(new SimpleDateFormat("EEE, MMM d").format(new Date()));
        welcomeLabel.setText("Welcome, " + AppState.getStaffUser() + "!");

        for (int i = 0; i < CATEGORIES.length; i++) {
            String cat = CATEGORIES[i];
            Button btn = new Button(CATEGORY_LABELS[i]);
            btn.getStyleClass().add("category-button");
            if ("all".equals(cat)) btn.getStyleClass().add("active");
            btn.setOnAction(e -> filterCategory(cat));
            categoryBox.getChildren().add(btn);
        }

        filterCategory("all");
        updateCartDisplay();
    }

    private void filterCategory(String category) {
        currentCategory = category;
        int idx = Arrays.asList(CATEGORIES).indexOf(category);
        for (int i = 0; i < categoryBox.getChildren().size(); i++) {
            if (categoryBox.getChildren().get(i) instanceof Button btn) {
                btn.getStyleClass().remove("active");
                if (i == idx) btn.getStyleClass().add("active");
            }
        }
        renderProducts();
    }

    private void renderProducts() {
        productsGrid.getChildren().clear();
        for (Product p : PRODUCTS) {
            if (!"all".equals(currentCategory) && !p.category.equals(currentCategory)) continue;
            VBox card = new VBox(5);
            card.getStyleClass().add("product-card");
            card.setPadding(new Insets(12));
            card.setPrefWidth(160);
            Label emoji = new Label(p.emoji);
            emoji.setStyle("-fx-font-size: 32px;");
            Label name = new Label(p.name);
            name.setWrapText(true);
            name.setMaxWidth(140);
            Label price = new Label(String.format("$%.2f", p.price));
            price.setStyle("-fx-font-weight: bold; -fx-text-fill: #ea580c;");
            card.getChildren().addAll(emoji, name, price);
            card.setOnMouseClicked(e -> addToCart(p.id));
            productsGrid.getChildren().add(card);
        }
    }

    private void addToCart(int productId) {
        Product p = Arrays.stream(PRODUCTS).filter(pr -> pr.id == productId).findFirst().orElse(null);
        if (p == null) return;
        CartItem existing = cart.get(productId);
        if (existing != null) {
            cart.put(productId, new CartItem(p, existing.quantity + 1));
        } else {
            cart.put(productId, new CartItem(p, 1));
        }
        updateCartDisplay();
    }

    private void updateCartDisplay() {
        cartItemsVBox.getChildren().clear();
        for (CartItem item : cart.values()) {
            HBox row = new HBox(10);
            row.getStyleClass().add("cart-item-row");
            row.setAlignment(javafx.geometry.Pos.CENTER_LEFT);
            row.setPadding(new Insets(10));
            Label emoji = new Label(item.product.emoji);
            emoji.setStyle("-fx-font-size: 20px;");
            VBox info = new VBox(2);
            HBox.setHgrow(info, Priority.ALWAYS);
            Label name = new Label(item.product.name);
            name.setStyle("-fx-font-weight: bold;");
            Label total = new Label(String.format("$%.2f", item.product.price * item.quantity));
            total.setStyle("-fx-text-fill: #ea580c; -fx-font-weight: bold;");
            info.getChildren().addAll(name, total);
            Button minus = new Button("−");
            minus.setOnAction(e -> updateQty(item.product.id, -1));
            Button plus = new Button("+");
            plus.setOnAction(e -> updateQty(item.product.id, 1));
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

    private void updateQty(int productId, int delta) {
        CartItem item = cart.get(productId);
        if (item == null) return;
        int newQty = item.quantity + delta;
        if (newQty <= 0) cart.remove(productId);
        else cart.put(productId, new CartItem(item.product, newQty));
        updateCartDisplay();
    }

    private void updateTotals() {
        double subtotal = cart.values().stream()
                .mapToDouble(i -> i.product.price * i.quantity)
                .sum();
        double tax = subtotal * 0.08;
        double total = subtotal + tax;
        subtotalLabel.setText(String.format("$%.2f", subtotal));
        taxLabel.setText(String.format("$%.2f", tax));
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
            AppState.addSale(new AppState.SaleRecord(
                    UUID.randomUUID().toString(),
                    item.product.name,
                    item.quantity,
                    item.product.price,
                    item.product.price * item.quantity,
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
        new Alert(Alert.AlertType.INFORMATION, "Staff: " + AppState.getStaffUser()).showAndWait();
    }

    @FXML
    private void handleLogout() throws Exception {
        AppState.setStaffUser("");
        AppNavigator.showLogin();
    }
}
