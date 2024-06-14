import { useRouter } from 'next/router';
import TaskForm from '@/components/taskForm';
import VersionHeader from '@/components/versionHeader';

export default function NewTask() {
    const router = useRouter();
    const { product, version, id } = router.query;

    return (
        <div>
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Nueva tarea asociada al ticket"
            />
            <TaskForm productId={product as string}
                    versionId={version as string}
                    ticketId={id as string}
            />
        </div>
    )
}
