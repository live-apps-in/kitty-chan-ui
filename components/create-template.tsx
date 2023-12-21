import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CreateTemplateDialogProps = {
  guildId: string | string[];
  feature: string;
  target: string | string[];
};

const CreateTemplateDialog = ({
  guildId,
  feature,
  target,
}: CreateTemplateDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Template</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose template type</DialogTitle>
          <DialogDescription>
            Pick your desired template type. Embed Template has several
            customization fields to provide attractive visuals. Plain message
            template is simplified with minimal fields.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center gap-4 justify-center">
            <Link href={`/dashboard/${guildId}/${feature}/${target}/embed`}>
              <Button>Embed Template</Button>
            </Link>
            <Link href={`/dashboard/${guildId}/${feature}/${target}/plain`}>
              <Button>Plain Template</Button>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
