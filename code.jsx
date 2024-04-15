import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import SunmiPrinter, {
  AlignValue,
  sunminScan,
} from "@heasy/react-native-sunmi-printer";


function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handlePrint = () => {
    // SunmiPrinter.setPrinterStyle({
    //   bold: true,
    //   underline: false,
    //   doubleWidth: false,
    //   doubleHeight: false,
    // });
    // SunmiPrinter.setAlignment();
    // SunmiPrinter.setFontName("宋体");

    // Set font size (e.g., 24)
    //     SunmiPrinter.setFontSize(24);
    //     const businessName = "Semuna Stores";
    //     const vatNumber = "TIN: 123456789";
    //     const location = "Location: Kyengera";
    //     const contacts = "0750440865/0779899789";
    //     SunmiPrinter.printColumnsString(
    //       ["ITEM 1", "UGX 20,0000"],
    //       ["ITEM 1", "UGX 20,0000"],

    //       [AlignValue.LEFT, AlignValue.RIGHT]
    //     );
    //     const receiptContent = `
    //       ${businessName.trim()}
    //       ${vatNumber.trim()}
    //       ${location.trim()}
    //       ${contacts.trim()}
    //       ${logo}
    //       Receipt
    // -------------------------------
    //   Item                     Price
    //     `;
    // --------------------------
    // Item 1      UGX 100,0000
    // Item 2      UGX 200,0000
    // ------------------------
    // Total:      UGX 300,000
    // -----------------------
    // Thank you for your purchase!
    SunmiPrinter.setFontSize(30);
    SunmiPrinter.setFontWeight(true);
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.setAlignment(AlignValue.CENTER);
    SunmiPrinter.printerText("SEMUNA STORES");
    SunmiPrinter.lineWrap(2);
    SunmiPrinter.setAlignment(AlignValue.LEFT);
    SunmiPrinter.printerText("LOCATION:KYENGERA\n");
    SunmiPrinter.setAlignment(AlignValue.LEFT);
    SunmiPrinter.printerText("TIN NO:1001219174\n");
    SunmiPrinter.setAlignment(AlignValue.LEFT);
    SunmiPrinter.setFontSize(24);
    SunmiPrinter.printerText("CONTACTS:0779899789/0750440865\n");
    SunmiPrinter.setAlignment(AlignValue.CENTER);
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.printerText("--------------------------------\n");
    SunmiPrinter.printColumnsString(
      ["ITEM", "PRICE"],
      [60, 120],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );
    SunmiPrinter.printColumnsString(
      ["Plates", "UGX 20,0000"],
      [60, 120],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );
    SunmiPrinter.printColumnsString(
      ["Cups", "UGX 200,0000"],
      [60, 100],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );
    SunmiPrinter.printerText("--------------------------------\n");
    SunmiPrinter.printColumnsString(
      ["TOTAL ", "UGX 220,0000"],
      [60, 120],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );

    SunmiPrinter.lineWrap(1);
    SunmiPrinter.setAlignment(AlignValue.CENTER);
    SunmiPrinter.print2DCode(
      "https://qr.api.cli.im/newqr/create?data=https%253A%252F%252Fgithub.com%252FSurile%252Freact-native-sunmi-printer&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=260&kid=cliim&key=db8abf82a7306ec8f01d41c1155b0a9d",
      1,
      4,
      4
    );
    SunmiPrinter.lineWrap(1);
    SunmiPrinter.setAlignment(AlignValue.CENTER);
    SunmiPrinter.printerText("Thank you for your purchase\n");
    SunmiPrinter.printColumnsString(
      ["Sold by", "Eve"],
      [60, 120],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );
    SunmiPrinter.printColumnsString(
      ["Date", "2023-03-9"],
      [60, 120],
      [AlignValue.LEFT, AlignValue.RIGHT]
    );
    SunmiPrinter.lineWrap(3);
    // SunmiPrinter.cutPaper();
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Text>PRINTIING PAPER</Text>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={handlePrint}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  backgroundColor: "purple",
                  padding: 20,
                  borderRadius: 5,
                }}
              >
                Print Receipt
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
