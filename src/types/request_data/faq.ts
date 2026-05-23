
export type Category = {
    _id: string;
    name: string;
}

export type FaqDetails = {
    _id: string;
    title: string;
    content: string;
    category?: { reference?: string };
}

export type EditFaqModalProps = {
    show: boolean;
    onHide: () => void;
    faqDetails: FaqDetails | null;
    handleFaqUpdate: () => void;
}

export type FaqData = {
    categoryReference: string;
    title: string;
    content: string;
}

export interface Question {
    title: string;
    content: string;
}

export interface FaqQuestionsData {
    categoryReference: string;
    questions: Question[];
}

export interface Errors {
    category?: string | boolean;
    title?: string | boolean;
    content?: string | boolean;
}

export interface Props {
    show: boolean;
    onHide: () => void;
    title?: string;
    handleFaqUpdate: () => void;
}

export interface FaqDataAdd {
    question: string;
    answer: string;
    [key: string]: string;
}

export interface FaqValidation {
    question: boolean;
    answer: boolean;
    [key: string]: boolean; 
}

export interface AddFaqsProps {
    show: boolean;
    title: string;
    question?: string;
    answer?: string;
    onHide: () => void;
    handleClose: () => void;
    id:number|string
}



