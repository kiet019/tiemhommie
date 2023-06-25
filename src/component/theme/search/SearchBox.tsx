import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { block, setup, suggest } from "../../../config/setup";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

export default function SearchBox() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);

  const handleSearchChange = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    const newSuggestions = suggest.filter((item) => {
      if (typeof item === "string" && typeof value === "string") {
        return item.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setSuggestions(newSuggestions);
  };
  const handleSelectSuggestion = (event: any, value: any) => {
    setSearchValue(value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(`/search/${searchValue}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "relative",
      }}
    >
      <label
        htmlFor="search"
        style={{
          position: "absolute",
          zIndex: 2,
          top: "55%",
          right: "1rem",
          transform: "translateY(-50%)",
        }}
      >
        <SearchIcon
          sx={{
            color: setup.navigationColor,
          }}
        />
      </label>
      <Autocomplete
        freeSolo
        onInputChange={handleSearchChange}
        onChange={handleSelectSuggestion}
        options={suggestions}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            id="search"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
                borderRadius: "1rem",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #FF9B9B",
                borderRadius: "1rem",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #FF9B9B !important",
              },
              width: "100%",
            }}
          />
        )}
      />
    </form>
  );
}
