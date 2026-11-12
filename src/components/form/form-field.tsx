import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Icon } from "@iconify/react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "cn";
import React, { useState, type ComponentProps } from "react";
import { Label } from "../ui/label";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;

  label?: string;
  description?: string;
  placeholder?: string;

  type?:
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch";

  icon?: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  options?: Option[];

  disabled?: boolean;
  required?: boolean;

  inputProps?: Record<string, unknown>;

  render?: (field: ControllerRenderProps<T, FieldPath<T>>) => React.ReactNode;
} & ComponentProps<typeof Field>;

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  icon,
  options = [],
  disabled,
  required,
  inputProps,
  render,
  ...props
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const invalid = fieldState.invalid;

        const commonProps = {
          disabled: disabled || field.disabled,
          "aria-invalid": invalid,
          ...inputProps,
        };

        function renderControl() {
          if (render) return render(field);

          switch (type) {
            case "textarea":
              return (
                <Textarea
                  {...field}
                  {...commonProps}
                  value={field.value ?? ""}
                  placeholder={placeholder}
                />
              );

            case "select":
              return (
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger aria-invalid={invalid}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );

            case "checkbox":
              return (
                <Checkbox
                  {...commonProps}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              );

            case "switch":
              return (
                <Switch
                  {...commonProps}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              );

            case "radio":
              return (
                <RadioGroup
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  disabled={disabled}
                  className="flex flex-col gap-3"
                >
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        disabled={option.disabled}
                      />
                      {option.label}
                    </label>
                  ))}
                </RadioGroup>
              );

            default:
              return (
                <InputGroup>
                  {icon && (
                    <InputGroupAddon>
                      <HugeiconsIcon icon={icon} />
                    </InputGroupAddon>
                  )}
                  <InputGroupInput
                    {...field}
                    {...commonProps}
                    value={field.value ?? ""}
                    type={type == "password" && showPassword ? "text" : type}
                    placeholder={placeholder}
                    required={required}
                  />
                  {type == "password" && (
                    <InputGroupAddon align="inline-end">
                      <HugeiconsIcon
                        type="button"
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        icon={showPassword ? ViewOffIcon : ViewIcon}
                      />
                    </InputGroupAddon>
                  )}
                </InputGroup>
              );
          }
        }

        return (
          <Field data-invalid={invalid} {...props}>
            {label && type != "checkbox" && (
              <FieldLabel htmlFor={field.name}>
                {label}
                {required && " *"}
              </FieldLabel>
            )}

            {type == "checkbox" ? (
              <Label>
                {renderControl()}
                <span>{label}</span>
              </Label>
            ) : (
              renderControl()
            )}

            {description && <FieldDescription>{description}</FieldDescription>}

            <FieldError errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
}

export type TextFieldProps<T extends FieldValues> = ComponentProps<"input"> & {
  icon?: string;
  label?: string;
  error?: string;
  helperText?: string;
  control?: Control<T>;
  name?: FieldPath<T>;
  render?: (field: ControllerRenderProps<T, FieldPath<T>>) => React.ReactNode;
}
export function InputField<T extends FieldValues>({
  className,
  render,
  control,
  name,
  icon,
  label,
  error,
  helperText,
  ...props
}: TextFieldProps<T>) {
  const id = React.useId();

  function renderItem(error?: string, controlProps?: any) {
    switch (props.type) {
      case "checkbox":
        return (
          <div className="flex gap-2">
            <input type="checkbox" className={cn("checkbox checkbox-primary mt-1", error && "is-invalid")} id={id} />
            <label className="label-text cursor-pointer flex flex-col" htmlFor={id}>
              <span className="text-sm">{label}</span>
              {error || helperText && <span className="helper-text">{error || helperText}</span>}
            </label>
          </div>
        )

      default:
        return (
          <div >
            {label && <label htmlFor={id} className="label-text text-sm">{label}</label>}
            <div className={cn("input", className)}>
              {icon && <Icon icon={icon} className="text-base-content/80 my-auto me-3 size-5 shrink-0" />}
              <input className={cn("grow", !!error && "is-invalid")} id={id} {...props} {...controlProps} />
            </div>
            {error || helperText && <span className="helper-text">{error || helperText}</span>}
          </div>
        )
    }
  }

  if (control && name) {
    return <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        if (render) return render(field) as any;
        return renderItem(fieldState.error?.message ?? error, field)
      }}
    />
  }

  return renderItem(error)
}

export function SubmitButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: ComponentProps<"button"> & {
  loading?: boolean;
}) {
  return (
    <button type="submit" className={cn("btn btn-primary btn-block", loading || disabled && "btn-disabled", className)} {...props}>
      <span hidden={!loading} className="loading loading-spinner"></span>
      {children}
    </button>
  );
}
