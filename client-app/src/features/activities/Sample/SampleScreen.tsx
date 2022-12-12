import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default function SampleScreen() {
  const { activityStore } = useStore();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return (
    <>
      <h1>{id}</h1>
    </>
  )
} 