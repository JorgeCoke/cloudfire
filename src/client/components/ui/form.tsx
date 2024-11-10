/* eslint-disable qwik/valid-lexical-scope */
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./buttons";
import { LucideChevronsUpDown } from "lucide-react";

type LabelProps = {
  label: string;
  required?: boolean;
  name?: string;
};
const Label = (props: LabelProps) => (
  <label htmlFor={props.name} className="text-neutral-900 font-medium text-sm">
    {props.label}
    {props.required && <span className="text-red-500">&nbsp;*</span>}
  </label>
);

type DescriptionProps = {
  description: string;
  name?: string;
};
const Description = (props: DescriptionProps) => (
  <p className="text-sm text-neutral-500">
    <label htmlFor={props.name}>{props.description}</label>
  </p>
);

type ErrorProps = {
  error: string;
};
const Error = (props: ErrorProps) => (
  <p className="text-sm text-red-500">{props.error}</p>
);

const GenericInputClass = (props: {
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}) =>
  cn(
    "flex flex-col gap-1",
    props.type === "hidden" && "hidden",
    props.disabled && "opacity-40"
  );

const InputWrapper = (
  props: GenericInputProps & {
    disabled?: boolean;
    name?: string;
    required?: boolean;
    children: ReactNode;
  }
) => (
  <div className={GenericInputClass(props)}>
    {props.label && (
      <Label name={props.name} label={props.label} required={props.required} />
    )}
    {props.children}
    {props.description && (
      <Description name={props.name} description={props.description} />
    )}
    {props.error && <Error error={props.error} />}
  </div>
);

type GenericInputProps = {
  label?: string;
  description?: string;
  error?: string;
};
export const Input = forwardRef<
  HTMLInputElement,
  GenericInputProps & InputHTMLAttributes<HTMLInputElement>
>(function Input(
  props: GenericInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref
) {
  return (
    <InputWrapper {...props}>
      <input
        {...props}
        ref={ref}
        className="shadow-sm grow rounded-md bg-white p-2.5 leading-4 text-neutral-800 ring-1 ring-inset ring-neutral-200 text-sm placeholder-neutral-500"
      />
    </InputWrapper>
  );
});

type SelectProps = {
  options: { label: string; value: string }[];
} & GenericInputProps;
export const Select = (
  props: SelectProps & InputHTMLAttributes<HTMLSelectElement>
) => {
  return (
    <InputWrapper {...props}>
      <div className="flex">
        <select
          {...props}
          className="shadow-sm block w-full appearance-none rounded-md rounded-r-none bg-white p-2.5 leading-4 text-neutral-800 ring-1 ring-inset ring-neutral-200 text-sm placeholder-neutral-500"
        >
          {props.options.map((e: { label: string; value: string }) => (
            <option
              key={e.value}
              value={e.value}
              // selected={props.value === e.value}
            >
              {e.label}
            </option>
          ))}
        </select>
        <Button
          size="icon"
          className="pointer-events-none rounded-l-none bg-white border-neutral-200 border-l-0"
        >
          <LucideChevronsUpDown className="h-4 w-4 text-black" />
        </Button>
      </div>
    </InputWrapper>
  );
};

// export const SearchInput = component$<
//   GenericInputProps & Omit<JSX.IntrinsicElements["input"], "type">
// >((props) => {
//   return (
//     <InputWrapper {...props}>
//       <div className="flex">
//         <input
//           {...(props as JSX.IntrinsicElements["input"])}
//           type="text"
//           className="grow rounded-md rounded-r-none bg-neutral-50 px-2 leading-4 text-neutral-800 ring-1 ring-inset ring-neutral-300"
//         />
//         <Button className="rounded-l-none">
//           <LucideSearch className="h-4 w-4" />
//         </Button>
//       </div>
//     </InputWrapper>
//   );
// });

// export const Checkbox = component$<
//   GenericInputProps &
//     Omit<JSX.IntrinsicElements["input"], "type" | "value"> & {
//       value: boolean | undefined;
//     }
// >((props) => {
//   return (
//     <div class={GenericInputClass(props)}>
//       <div className="flex gap-3">
//         <input
//           {...(props as JSX.IntrinsicElements["input"])}
//           className="mt-0.5 shrink-0 rounded-md border-gray-200 bg-white p-2 leading-4 text-neutral-800"
//           id={props.name}
//           type="checkbox"
//           checked={props.value}
//         />
//         <div>
//           {props.label && (
//             <Label
//               name={props.name}
//               label={props.label}
//               required={props.required}
//             />
//           )}
//           {props.description && (
//             <Description name={props.name} description={props.description} />
//           )}
//         </div>
//       </div>
//       {props.error && <Error error={props.error} />}
//     </div>
//   );
// });

// export const Datepicker = component$<
//   GenericInputProps &
//     Omit<JSX.IntrinsicElements["input"], "type" | "value"> & {
//       type: "date" | "datetime-local";
//       value: Date | undefined;
//     }
// >(({ value, ...props }) => {
//   const timezoneFixed = useSignal(false);
//   const localeValue = useSignal(
//     props.type === "date"
//       ? value?.toISOString().split("T")[0]
//       : value?.toISOString().substring(0, 16)
//   );

//   useTask$(({ track }) => {
//     track(() => value);
//     if (!timezoneFixed.value) {
//       const localDate = value ? new Date(value) : undefined;

//       if (localDate) {
//         localDate.setMinutes(
//           localDate.getMinutes() - localDate.getTimezoneOffset()
//         );
//       }
//       localeValue.value =
//         props.type === "date"
//           ? localDate?.toISOString().split("T")[0]
//           : localDate?.toISOString().substring(0, 16);
//       timezoneFixed.value = true;
//     }
//   });

//   return (
//     <InputWrapper {...props}>
//       <input
//         {...(props as JSX.IntrinsicElements["input"])}
//         className="grow rounded-md bg-neutral-50 p-2 leading-4 text-neutral-800 ring-1 ring-inset ring-neutral-300"
//         value={localeValue.value}
//       />
//     </InputWrapper>
//   );
// });

// export const toLocaleDate = (date: Date | null | undefined) => {
//   if (!date) {
//     return undefined;
//   }
//   date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
//   return date.toISOString().split("T")[0];
// };

// export const toLocaleDateTime = (date: Date | null | undefined) => {
//   if (!date) {
//     return undefined;
//   }
//   date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
//   return date.toISOString().substring(0, 16);
// };
