<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>
@if($dueProjects->count() > 0 || $dueTasks->count() > 0)
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong class="font-bold">Attention!</strong>
        <ul class="list-disc list-inside">
            @foreach($dueProjects as $project)
                <li>Project "<strong>{{ $project->name }}</strong>" is due on {{ \Carbon\Carbon::parse($project->due_date)->toFormattedDateString() }}.</li>
            @endforeach
            @foreach($dueTasks as $task)
                <li>Task "<strong>{{ $task->title }}</strong>" is due on {{ \Carbon\Carbon::parse($task->due_date)->toFormattedDateString() }}.</li>
            @endforeach
        </ul>
    </div>
@endif


</x-app-layout>
