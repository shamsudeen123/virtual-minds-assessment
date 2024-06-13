"use client";
import Head from "next/head";
import EmployeeListing from "./customer-listing/page";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      <EmployeeListing />
    </>
  );
}
