import React, { useState } from "react";
import HomeNav from "../components/HomeNav";
import GameCon from "../components/containers/GameCon";
import { useParams } from "react-router-dom";
import axios from "axios";

const GamePage = () => {
 
  return (
    <div>
      <HomeNav></HomeNav>
      <GameCon></GameCon>
    </div>
  );
};
export default GamePage;
