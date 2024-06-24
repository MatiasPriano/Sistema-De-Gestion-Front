import React, { useState } from "react";
import Input from "../input/input";
import AutocompleteInput from "../input/autocomplete";
import TextArea from "../input/textArea";
import ButtonRow, { ButtonOption } from "../button/buttonRow";
import TextButton from "../button/textButton";
import { toast } from "react-hot-toast";
import ComboBox from "../input/comboBox";
import TaskProject, { State } from "@";

const stateOptions: State[] = [
  "OPEN",
  "CLOSED",
  "PROGRESS",
  "BLOCKED",
  "FINISHED",
];

const priorityOptions: ButtonOption[] = [
  { title: "LOW", colour: "green" },
  { title: "MEDIUM", colour: "orange" },
  { title: "HIGH", colour: "red" },
];

export interface TaskInputs {
  [key: string]: boolean;
  title: boolean;
  responsable: boolean;
  description: boolean;
  status: boolean;
  priority: boolean;
  startDate: boolean;
  endDate: boolean;
  maxResolutionTime: boolean;
}

interface TaskFormProps {
  task: TaskProject;
  setTask: (task: TaskProject) => void;
  disabledInputs: TaskInputs;
  requiredInputs: TaskInputs;
  submitButtonName: string;
  onSubmit: () => void;
  onCancel: () => void;
  resources: string[];
}

export default function TaskProjectForm({
  task,
  setTask,
  disabledInputs,
  requiredInputs,
  submitButtonName,
  onSubmit,
  onCancel,
  resources,
}: TaskFormProps) {
  const [invalidInputs, setInvalidInputs] = useState<TaskInputs>({
    title: false,
    responsable: false,
    description: false,
    status: false,
    priority: false,
    startDate: false,
    endDate: false,
    maxResolutionTime: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalInvalidInputs: TaskInputs = {
      title: requiredInputs.title && task.title.trim() === "",
      responsable:
        requiredInputs.responsable &&
        !resources.includes(task.responsable || ""),
      description: requiredInputs.description && task.description.trim() === "",
      status:
        requiredInputs.status && !["OPEN", "CLOSED"].includes(task.status),
      priority:
        requiredInputs.priority &&
        !["LOW", "MEDIUM", "HIGH"].includes(task.priority),
      startDate: requiredInputs.startDate && task.startDate.trim() === "",
      endDate: requiredInputs.endDate && task.endDate.trim() === "",
      maxResolutionTime:
        requiredInputs.maxResolutionTime &&
        task.maxTimeResolution.trim() === "",
    };

    if (
      !finalInvalidInputs.title &&
      !finalInvalidInputs.responsable &&
      !finalInvalidInputs.description &&
      !finalInvalidInputs.status &&
      !finalInvalidInputs.priority &&
      !finalInvalidInputs.startDate &&
      !finalInvalidInputs.endDate &&
      !finalInvalidInputs.maxResolutionTime
    ) {
      onSubmit();
    } else {
      setInvalidInputs(finalInvalidInputs);
      toast.error("Existen campos incompletos");
    }
  };

  const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: event.target.value });
  };
  const handleTitleFocus = () => {
    setInvalidInputs({ ...invalidInputs, title: false });
  };

  const setResponsable = (responsable: string) => {
    setTask({ ...task, responsable: responsable });
  };
  const handleResponsableFocus = () => {
    setInvalidInputs({ ...invalidInputs, responsable: false });
  };

  const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, description: event.target.value });
  };
  const handleDescriptionFocus = () => {
    setInvalidInputs({ ...invalidInputs, description: false });
  };

  const setPriority = (priority: string | null) => {
    setTask({ ...task, priority: priority || "" });
  };
  const handlePriorityFocus = () => {
    setInvalidInputs({ ...invalidInputs, priority: false });
  };

  const setStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, startDate: event.target.value });
  };
  const handleStartDateFocus = () => {
    setInvalidInputs({ ...invalidInputs, startDate: false });
  };

  const setEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, endDate: event.target.value });
  };
  const handleEndDateFocus = () => {
    setInvalidInputs({ ...invalidInputs, endDate: false });
  };

  const setMaxResolutionTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, maxTimeResolution: event.target.value });
  };
  const handleMaxResolutionTimeFocus = () => {
    setInvalidInputs({ ...invalidInputs, maxResolutionTime: false });
  };
  const setState = (state: string) => {
    setTask({ ...task, status: state as State });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 shadow-lg border border-border bg-backgroundContainer px-4 py-8 rounded-xl">
        <Input
          title="Título"
          placeholder="Ingrese un título"
          value={task.title}
          setValue={setTitle}
          error={invalidInputs.title}
          handleFocus={handleTitleFocus}
          isRequired={requiredInputs.title}
          disabled={disabledInputs.title}
        />
        <AutocompleteInput
          title="Responsable"
          placeholder="Buscar responsable"
          value={task.responsable || ""}
          setValue={setResponsable}
          error={invalidInputs.responsable}
          errorText="El responsable debe ser valido"
          handleFocus={handleResponsableFocus}
          isRequired={requiredInputs.responsable}
          items={resources}
          disabled={disabledInputs.responsable}
        />
        <div className="col-span-full">
          <TextArea
            title="Descripción"
            value={task.description}
            setValue={setDescription}
            placeholder="Agregar una descripción"
            isRequired={requiredInputs.description}
            error={invalidInputs.description}
            handleFocus={handleDescriptionFocus}
            disabled={disabledInputs.description}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-title"
          >
            Fecha de inicio
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="startDate"
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 text-subtitle"
              placeholder="Seleccionar fecha"
              value={task.startDate || ""}
              onChange={setStartDate}
              onFocus={handleStartDateFocus}
              disabled={disabledInputs.startDate}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-title"
          >
            Fecha de fin
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="endDate"
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Seleccionar fecha"
              value={task.endDate || ""}
              onChange={setEndDate}
              onFocus={handleEndDateFocus}
              disabled={disabledInputs.endDate}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="maxResolutionTime"
            className="block text-sm font-medium text-title"
          >
            Tiempo máximo de resolución
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="maxResolutionTime"
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Ingresar tiempo"
              value={task.maxTimeResolution || ""}
              onChange={setMaxResolutionTime}
              onFocus={handleMaxResolutionTimeFocus}
              disabled={disabledInputs.maxResolutionTime}
            />
          </div>
        </div>

        <ComboBox
          title="Estado"
          options={stateOptions}
          selected={task.status}
          disabled={disabledInputs.status}
          onChange={setState}
        />

        <ButtonRow
          title="Prioridad"
          options={priorityOptions}
          selected={task.priority}
          setSelected={setPriority}
          isRequired={requiredInputs.priority}
          error={invalidInputs.priority}
          handleFocus={handlePriorityFocus}
          disabled={disabledInputs.priority}
        />

        <div className="flex col-span-full pt-2">
          <div className="flex items-center justify-end gap-x-6 px-4 w-full">
            <TextButton
              name="Cancelar"
              style="transparent"
              onClick={onCancel}
            />
            <TextButton name={submitButtonName} type="submit" style="primary" />
          </div>
        </div>
      </main>
    </form>
  );
}
