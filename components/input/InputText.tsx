import {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';
// export enum InputType {
//   button = 'button',
//   checkbox = 'checkbox',
//   color = 'color',
//   date = 'date',
//   datetimelocal = 'datetime-local',
//   email = 'email',
//   file = 'file',
//   hidden = 'hidden',
//   image = 'image',
//   month = 'month',
//   number = 'number',
//   password = 'password',
//   radio = 'radio',
//   range = 'range',
//   reset = 'reset',
//   search = 'search',
//   submit = 'submit',
//   tel = 'tel',
//   text = 'text',
//   time = 'time',
//   url = 'url',
//   week = 'week',
// }
type InputBaseProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: CSSProperties;
  value?: string;
};
const InputText = (props: InputBaseProps) => {
  return (
    <input
      {...props}
      className={`w-full h-40 px-16 ${props.className ? props.className : ''}`}
    >
      {props.children}
    </input>
  );
};
export default InputText;
