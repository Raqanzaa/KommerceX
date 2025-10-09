<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Simple E-Commerce</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Poppins font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body, html {
            font-family: 'Poppins', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100">

    <nav class="bg-white shadow-md">
        <div class="container mx-auto px-6 py-3">
            <div class="flex justify-between items-center">
                <a class="text-gray-800 text-xl font-bold" href="{{ route('products') }}">MyStore</a>
                <div class="flex items-center space-x-4">
                    <a href="{{ route('products') }}" class="text-gray-600 hover:text-blue-500 transition">Products</a>
                    <a href="{{ route('cart') }}" class="text-gray-600 hover:text-blue-500 transition">Cart</a>
                    {{-- <div id="admin-links" class="contents"></div>
                    <div id="auth-links"></div> --}}
                    <div id="dynamic-nav-links" class="contents"></div>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
        @yield('content')
    </main>

    <script>
        // Authentication & UI logic
        const token = localStorage.getItem('api_token');
        const user = JSON.parse(localStorage.getItem('user_data'));
        // const authLinksContainer = document.getElementById('auth-links');
        // const adminLinksContainer = document.getElementById('admin-links');
        const dynamicLinksContainer = document.getElementById('dynamic-nav-links');

        // --- Render Function ---
        function renderLinks() {
            let linksHtml = '';

            if (token && user) {
                // if (user.role === 'admin') {
                //     linksHtml += `<a href="{{ route('admin.products.create') }}" class="text-blue-600 hover:text-blue-800 ml-4 font-semibold transition-colors duration-200">Add Product</a>`;
                // }
                
                linksHtml += `
                    <div class="flex items-center space-x-4 pl-4">
                        <span class="text-gray-700">Hi, ${user.name.split(' ')[0]}</span>
                        <button onclick="logout()" class="text-red-500 hover:text-red-700 font-medium transition-colors duration-200">Logout</button>
                    </div>
                `;

            } else {
                linksHtml += `
                    <div class="flex items-center space-x-6 pl-4">
                         <a href="{{ route('login') }}" class="px-4 py-2 bg-blue-500 text-white text-sm font-bold uppercase rounded-md hover:bg-blue-600">Login</a>
                    </div>
                `;
            }

            dynamicLinksContainer.innerHTML = linksHtml;
        }

        async function logout() {
            try {
                const response = await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });
                if (response.ok) {
                    localStorage.removeItem('api_token');
                    localStorage.removeItem('user_data');
                    window.location.href = '/login';
                } else {
                    alert('Logout failed!');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        }

        async function fetchWithAuth(url, options = {}) {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('api_token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options.headers,
            };
            const response = await fetch(url, { ...options, headers });
            if (response.status === 401) {
                localStorage.removeItem('api_token');
                localStorage.removeItem('user_data');
                window.location.href = '/login';
                return;
            }
            return response;
        }

        renderLinks();
    </script>
    
    @stack('scripts')
</body>
</html>