export interface Poll {
    pollId: string; 
    question: string;
    options: string[];
    answer?: string;
}