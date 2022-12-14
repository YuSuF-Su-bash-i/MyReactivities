import React from "react";
import { useParams } from "react-router-dom";

export default function SampleScreen() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return (
    <>
      <h1>{id}</h1>
    </>
  )
} 