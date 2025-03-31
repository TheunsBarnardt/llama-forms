import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ResponseValidationProps {
  questionName: string; // The name of the question/field in your form
  fieldType: "text" | "number" | "regex"; // Specify the field type
}

const ResponseValidation: React.FC<ResponseValidationProps> = ({ questionName, fieldType }) => {
  
  const { setValue, getValues } = useFormContext();
  const [validationType, setValidationType] = useState<string>(
    fieldType === "number" ? "greater_than" : "contains"
  );
  const [validationValue, setValidationValue] = useState<string>("");
  const [validationValue2, setValidationValue2] = useState<string>(""); // For "between" and "not between"
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    updateValidation();
  }, [validationType, validationValue, validationValue2, errorMessage]);

  const updateValidation = () => {
    let validationSchema: z.ZodTypeAny | undefined;

    if (fieldType === "number") {
      switch (validationType) {
        case "greater_than":
          if (validationValue) {
            validationSchema = z.number().gt(Number(validationValue), errorMessage || `Must be greater than ${validationValue}`);
          }
          break;
        case "greater_than_or_equal_to":
          if (validationValue) {
            validationSchema = z.number().gte(Number(validationValue), errorMessage || `Must be greater than or equal to ${validationValue}`);
          }
          break;
        case "less_than":
          if (validationValue) {
            validationSchema = z.number().lt(Number(validationValue), errorMessage || `Must be less than ${validationValue}`);
          }
          break;
        case "less_than_or_equal_to":
          if (validationValue) {
            validationSchema = z.number().lte(Number(validationValue), errorMessage || `Must be less than or equal to ${validationValue}`);
          }
          break;
        case "equals":
          if (validationValue) {
            validationSchema = z.number().refine(val => val === Number(validationValue), errorMessage || `Must be equal to ${validationValue}`);
          }
          break;
        case "not_equals":
          if (validationValue) {
            validationSchema = z.number().refine(val => val !== Number(validationValue), errorMessage || `Must not be equal to ${validationValue}`);
          }
          break;
        case "between":
          if (validationValue && validationValue2) {
            validationSchema = z.number().gte(Number(validationValue)).lte(Number(validationValue2), errorMessage || `Must be between ${validationValue} and ${validationValue2}`);
          }
          break;
        case "not_between":
          if (validationValue && validationValue2) {
            validationSchema = z.number().refine(
              val => val < Number(validationValue) || val > Number(validationValue2),
              errorMessage || `Must not be between ${validationValue} and ${validationValue2}`
            );
          }
          break;
        case "is_number":
          validationSchema = z.number().refine(val => !isNaN(val), { message: errorMessage || "Must be a number" });
          break;
        case "whole_number":
          validationSchema = z.number({ message: errorMessage || "Must be a whole number" }).int();
          break;
        default:
          validationSchema = undefined;
      }
    } else if (fieldType === "text") {
      switch (validationType) {
        case "contains":
          if (validationValue) {
            validationSchema = z.string().includes(validationValue, { message: errorMessage || `Must contain "${validationValue}"` });
          }
          break;
        case "does_not_contain":
          if (validationValue) {
            validationSchema = z.string().refine(val => !val.includes(validationValue), errorMessage || `Must not contain "${validationValue}"`);
          }
          break;
        case "email":
          validationSchema = z.string().email(errorMessage || "Must be a valid email");
          break;
        case "url":
          validationSchema = z.string().url(errorMessage || "Must be a valid URL");
          break;
        default:
          validationSchema = undefined;
      }
    } else if (fieldType === "regex") {
      switch (validationType) {
        case "contains":
          if (validationValue) {
            validationSchema = z.string().includes(validationValue, { message: errorMessage || `Must contain "${validationValue}"` });
          }
          break;
        case "does_not_contain":
          if (validationValue) {
            validationSchema = z.string().refine(val => !val.includes(validationValue), errorMessage || `Must not contain "${validationValue}"`);
          }
          break;
        case "matches":
          if (validationValue) {
            try {
              const regex = new RegExp(validationValue);
              validationSchema = z.string().regex(regex, errorMessage || `Must match pattern "${validationValue}"`);
            } catch {
              validationSchema = z.string().refine(() => false, "Invalid regular expression");
            }
          }
          break;
        case "does_not_match":
          if (validationValue) {
            try {
              const regex = new RegExp(validationValue);
              validationSchema = z.string().refine(val => !regex.test(val), errorMessage || `Must not match pattern "${validationValue}"`);
            } catch {
              validationSchema = z.string().refine(() => false, "Invalid regular expression");
            }
          }
          break;
        default:
          validationSchema = undefined;
      }
    }

    setValue(questionName, getValues(questionName), { shouldValidate: !!validationSchema });
  };

  const getSelectItems = () => {
    if (fieldType === "number") {
      return (
        <>
          <SelectItem value="greater_than">Greater than</SelectItem>
          <SelectItem value="greater_than_or_equal_to">Greater than or equal to</SelectItem>
          <SelectItem value="less_than">Less than</SelectItem>
          <SelectItem value="less_than_or_equal_to">Less than or equal to</SelectItem>
          <SelectItem value="equals">Equals</SelectItem>
          <SelectItem value="not_equals">Not equal to</SelectItem>
          <SelectItem value="between">Between</SelectItem>
          <SelectItem value="not_between">Not between</SelectItem>
          <SelectItem value="is_number">Is number</SelectItem>
          <SelectItem value="whole_number">Whole number</SelectItem>
        </>
      );
    } else if (fieldType === "text") {
      return (
        <>
          <SelectItem value="contains">Contains</SelectItem>
          <SelectItem value="does_not_contain">Doesn&apos;t contain</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="url">URL</SelectItem>
        </>
      );
    } else {
      return (
        <>
          <SelectItem value="contains">Contains</SelectItem>
          <SelectItem value="does_not_contain">Doesn&apos;t contain</SelectItem>
          <SelectItem value="matches">Matches</SelectItem>
          <SelectItem value="does_not_match">Doesn&apos;t match</SelectItem>
        </>
      );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={validationType} onValueChange={setValidationType}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Validation Type" />
        </SelectTrigger>
        <SelectContent>{getSelectItems()}</SelectContent>
      </Select>

      {fieldType === "number" && (validationType === "between" || validationType === "not_between") ? (
        <>
          <Input
            type="number"
            placeholder="From"
            value={validationValue}
            onChange={(e) => setValidationValue(e.target.value)}
          />
          <Input
            type="number"
            placeholder="To"
            value={validationValue2}
            onChange={(e) => setValidationValue2(e.target.value)}
          />
        </>
      ) : (
        <Input
          type={fieldType === "number" ? "number" : "text"}
          placeholder={fieldType === "regex" ? "Pattern" : "Validation Value"}
          value={validationValue}
          onChange={(e) => setValidationValue(e.target.value)}
        />
      )}

      <Input
        type="text"
        placeholder="Custom Error Text (Optional)"
        value={errorMessage}
        onChange={(e) => setErrorMessage(e.target.value)}
      />

      <Button variant="ghost" size="icon" onClick={() => {
        setValidationType(fieldType === "number" ? "greater_than" : "contains");
        setValidationValue("");
        setValidationValue2("");
        setErrorMessage("");
      }}>
        X
      </Button>
    </div>
  );
};

export default ResponseValidation;