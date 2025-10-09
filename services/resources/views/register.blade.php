@extends('layouts.app')

@section('content')
<div class="flex justify-center">
    <div class="w-full max-w-md">
        <div class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold text-center mb-4">Register</h1>
            <form id="register-form">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="name" type="text" placeholder="Your Name" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="email" type="email" placeholder="Email" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="password" type="password" placeholder="******************" required>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Register
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="{{ route('login') }}">
                        Already have an account?
                    </a>
                </div>
            </form>
            <p id="message" class="text-center mt-4"></p>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');
    messageEl.textContent = '';
    messageEl.className = 'text-center mt-4';

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.classList.add('text-green-500');
            messageEl.textContent = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            messageEl.classList.add('text-red-500');
            let errors = Object.values(data.errors).map(e => e.join(' ')).join('\n');
            messageEl.textContent = errors || 'Registration failed.';
        }
    } catch (error) {
        messageEl.classList.add('text-red-500');
        messageEl.textContent = 'An error occurred.';
        console.error('Error:', error);
    }
});
</script>
@endpush