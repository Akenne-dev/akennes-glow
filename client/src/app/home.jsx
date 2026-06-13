import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

const sections = [
  { title: "Products", href: "/product-details" },
  { title: "Cart", href: "/cart" },
  { title: "Wishlist", href: "/wishlist" },
  { title: "Profile", href: "/profile" },
  { title: "Vendor Dashboard", href: "/vendor-dashboard" },
  { title: "Admin Dashboard", href: "/admin-dashboard" },
];

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Choose where to go next.</Text>

      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          style={styles.link}
          asChild
        >
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{section.title}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  link: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
