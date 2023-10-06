export interface ITask{
    title: string;
    dateCreation: string;
    status: "Completed" | "Incompleted";
}

export type taskFilter = "All" | "Completed" | "Incompleted";