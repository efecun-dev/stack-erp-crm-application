import Button from "./Button";

interface ModalProps {
  header: {
    title: string;
    subtitle: string;
  };

  children?: React.ReactNode;

  footer: {
    cancel: string;
    cta: string;
  };

  formId: string;

  active: boolean;

  onClose: () => void;
}

export default function Modal({
  header,
  children,
  footer,
  formId,
  active,
  onClose,
}: Readonly<ModalProps>) {
  return (
    <>
      <div
        className={`z-20 fixed inset-0 top-0 left-0 w-full h-screen bg-[rgba(11,46,51,0.45)] items-center justify-center ${active ? "flex" : "hidden"} flex-col`}
      >
        <div className="bg-white shadow-lg rounded-xl relative max-h-[90vh] overflow-y-auto min-w-150 max-w-200">
          {/* HEADER */}
          <div className="flex flex-col gap-1 p-5">
            <h4 className="text-[#0B2E33]">{header.title}</h4>
            <p className="text-sm text-gray-400">{header.subtitle}</p>
          </div>
          <div className="w-full h-px bg-gray-100"></div>
          {/* BODY */}
          <div className="p-5">{children}</div>
          <div className="w-full h-px bg-gray-100"></div>
          {/* FOOTER */}
          <div className="flex items-center p-5 gap-3 justify-end">
            <Button variant="secondary" type="button" onClick={onClose}>
              {footer.cancel}
            </Button>
            <Button type="submit" form={formId}>
              {footer.cta}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
