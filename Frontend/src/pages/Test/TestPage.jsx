import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../component/BreadCums";
import { AiOutlineCloseCircle } from "react-icons/ai"; // For the close icon
import QuantumFeatures from "./TestCard";
import { useLocation } from "react-router-dom";

const services = [
  "MRI",
  "Radionuclide Therapies",
  "CT Scan",
  "Ultrasound",
  "X-Ray",
  "Blood Tests",
  "ECG",
  "Pathology",
  "PET CT",
  "Gamma Scans",
  "Mammograph",
  "OPG",
  "DEXA",
  "Neurology",
  "Cardiology",
];

const tests = [
  { id: 1, name: "MRI Scan", category: "MRI", price: 5000 },
  { id: 2, name: "CT Scan", category: "CT Scan", price: 3000 },
  { id: 3, name: "Ultrasound", category: "Ultrasound", price: 1500 },
  { id: 4, name: "Blood Test", category: "Blood Tests", price: 800 },
  { id: 5, name: "X-Ray", category: "X-Ray", price: 1000 },
  { id: 6, name: "ECG", category: "ECG", price: 1200 },
  { id: 7, name: "Radionuclide Therapy", category: "Radionuclide Therapies", price: 15000 },
  { id: 8, name: "Pathology Test", category: "Pathology", price: 2000 },
  { id: 9, name: "PET CT Scan", category: "PET CT", price: 10000 },
  { id: 10, name: "Gamma Scans", category: "Gamma Scans", price: 12000 },
  { id: 11, name: "Mammograph", category: "Mammograph", price: 3500 },
  { id: 12, name: "OPG Scan", category: "OPG", price: 2500 },
  { id: 13, name: "DEXA Scan", category: "DEXA", price: 4000 },
  { id: 14, name: "Neurology Test", category: "Neurology", price: 4500 },
  { id: 15, name: "Cardiology Test", category: "Cardiology", price: 6000 },
  { id: 16, name: "Cardiology Test", category: "Cardiology", price: 6000 },
];

const TestPage = () => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Added search term state
  const [sortOrder, setSortOrder] = useState("none"); // Added sort order state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const location=useLocation()

  // Toggle test selection
  const toggleTestSelection = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((item) => item !== test) : [...prev, test]
    );
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedTests([]);
  };

  // Filter tests based on category and search term
  const filteredTests = tests
    .filter((test) => {
      const matchesCategory = filterCategory ? test.category === filterCategory : true;
      const matchesSearchTerm = test.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      }
      if (sortOrder === "highToLow") {
        return b.price - a.price;
      }
      return 0; // No sorting if sortOrder is 'none'
    })
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Pagination logic
  const totalPages = Math.ceil(tests.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePagination = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Test' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname === '/find/test') {
      window.scrollTo(0, 0);
    }
  }, [location]);
  

  return (
    <div>
      <BreadCrumbs items={breadcrumbItems} headText={"Our Best Available Medical Test in Lucknow"} />
      <QuantumFeatures/>

    </div>
  );
};

export default TestPage;
