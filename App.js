import React, { useState, useRef, useEffect } from "react";
import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [position, setPosition] = useState({});
  const [panResponder, setPanResponder] = useState({});
  const [dropPositions, setDropPositions] = useState([]);
  const [isOver, setIsOver] = useState(false);
  console.log("dropPositions", dropPositions);

  const handleCheckIfOver = (x, y) => {
    if (
      x > dropPositions[0].x &&
      x < dropPositions[0].x + dropPositions[0].width &&
      y > dropPositions[0].y &&
      y < dropPositions[0].y + dropPositions[0].height
    ) {
      setIsOver(true);
      if (
        x < dropPositions[0].x ||
        x > dropPositions[0].x + dropPositions[0].width ||
        y < dropPositions[0].y ||
        y > dropPositions[0].y + dropPositions[0].height
      ) {
        setIsOver(false);
      }
    }
  };

  useEffect(() => {
    setPosition(new Animated.ValueXY());
  }, []);

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gesture) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
          handleCheckIfOver(gesture.moveX, gesture.moveY);
        },
        onPanResponderRelease: () => {
          position.setValue({ x: 0, y: 0 });
        },
      })
    );
  }, [position]);

  const handleGetPos = ({ nativeEvent: { layout } }) => {
    setDropPositions([...dropPositions, layout]);
  };

  const backgroundColor = isOver ? "#bada55" : "none";

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY: position.y }, { translateX: position.x }],
        }}
        {...panResponder.panHandlers}
      >
        <Text>Draggable Item</Text>
      </Animated.View>
      <View
        style={[
          {
            borderColor: "green",
            borderWidth: 2,
            padding: 50,
            marginVertical: 10,
            backgroundColor,
          },
        ]}
        onLayout={handleGetPos}
      >
        <Text>Drag Target</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
