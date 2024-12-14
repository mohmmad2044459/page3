document.addEventListener('DOMContentLoaded', () => {
    const modalPostForm = document.getElementById('modalPostForm');
    const postsList = document.getElementById('postsList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modalTitleInput = document.getElementById('modalTitleInput');
    const modalDescriptionInput = document.getElementById('modalDescriptionInput');
    const modalPriceInput = document.getElementById('modalPriceInput');
    const modalPhoneInput = document.getElementById('modalPhoneInput');
    const modalCategoryInput = document.getElementById('modalCategoryInput');
    const modalImageInput = document.getElementById('modalImageInput');
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const posts = []; // مصفوفة لتخزين المنشورات

    // عرض المنشورات
    const renderPosts = (filter = 'all') => {
        postsList.innerHTML = '';
        const filteredPosts = posts.filter(post => filter === 'all' || post.category === filter);
        filteredPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card card shadow-sm';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <p class="font-weight-bold">السعر: ${post.price} دينار</p>
                    <p class="text-primary">رقم الهاتف: ${post.phoneNumber}</p>
                </div>
            `;
            postsList.appendChild(postElement);
        });
    };

    // إضافة منشور جديد
    modalPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const imageFile = modalImageInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const newPost = {
                title: modalTitleInput.value,
                description: modalDescriptionInput.value,
                price: modalPriceInput.value,
                phoneNumber: modalPhoneInput.value,
                category: modalCategoryInput.value,
                image: event.target.result
            };
            posts.push(newPost);
            renderPosts();
            modalPostForm.reset();
            postModal.hide();
        };
        reader.readAsDataURL(imageFile);
    });

    // تطبيق الفلاتر
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderPosts(e.target.getAttribute('data-filter'));
        });
    });

     // عرض المنشورات عند تحميل الصفحة
});
