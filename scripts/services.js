// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let allServices = [];
    let currentFilter = 'all';

    // Initialize services page
    initializeServices();
    initializeFilters();
    loadServices();

    function initializeServices() {
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            once: true
        });
    }

    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter services
                currentFilter = this.dataset.filter;
                filterServices();
            });
        });
    }

    function loadServices() {
        allServices = [
            {
                id: 1,
                name: 'Leaky Faucet Repair',
                description: 'Fix minor leaks in faucets and pipes',
                price: 50,
                rating: 4.7,
                reviews: 90,
                image: '../assets/faucet_images.png',
                category: 'repair',
                features: ['Quick diagnosis', 'Quality parts', 'Warranty included', 'Same day service'],
                duration: '1-2 hours'
            },
            {
                id: 2,
                name: 'Water Heater Installation',
                description: 'Install new water heater systems in homes',
                price: 100,
                rating: 4.8,
                reviews: 60,
                image: '../assets/water_heater.png',
                category: 'repair',
                features: ['Professional installation', 'Safety check', '6 months warranty', 'Free maintenance tips'],
                duration: '2-3 hours'
            },
            {
                id: 3,
                name: 'Fan Installation',
                description: 'Install and replace ceiling fans and lighting',
                price: 75,
                rating: 4.6,
                reviews: 80,
                image: '../assets/fan_image.png',
                category: 'repair',
                features: ['Electrical safety check', 'Mounting included', 'Speed regulator setup', 'Clean installation'],
                duration: '1-2 hours'
            },
            {
                id: 4,
                name: 'Switchboard Repair',
                description: 'Repair faulty switchboards and electrical outlets',
                price: 50,
                rating: 4.7,
                reviews: 65,
                image: '../assets/services/switches_images.png',
                category: 'repair',
                features: ['Electrical diagnosis', 'Safe repairs', 'Quality switches', 'Testing included'],
                duration: '1-2 hours'
            },
            {
                id: 5,
                name: 'Kitchen Cleaning',
                description: 'Deep cleaning of kitchen including appliances and surfaces',
                price: 100,
                rating: 4.9,
                reviews: 120,
                image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/401808890/WR/UK/BU/14823340/kitchen-chimney-cleaning-service.jpg" alt="Kitchen Chimney Cleaning',
                category: 'cleaning',
                features: ['Eco-friendly products', 'Appliance cleaning', 'Deep sanitization', 'Grease removal'],
                duration: '3-4 hours'
            },
            {
                id: 6,
                name: 'Bathroom Deep Cleaning',
                description: 'Deep cleaning of bathroom surfaces, tiles, and fixtures',
                price: 75,
                rating: 4.8,
                reviews: 95,
                image: 'https://www.southernliving.com/thmb/FYfR4gtrruf5ENcg9-PZXARRKX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1224808645-8c50b5d0099e4eb8a8d591321787237b.jpg',
                category: 'cleaning',
                features: ['Tile cleaning', 'Fixture polishing', 'Drain cleaning', 'Sanitization'],
                duration: '2-3 hours'
            },
            {
                id: 7,
                name: 'Haircut and Styling',
                description: 'Professional hairstyling and haircuts at home',
                price: 50,
                rating: 4.6,
                reviews: 85,
                image: '../assets/barbar_image.png',
                category: 'beauty',
                features: ['Professional styling', 'Quality products', 'Hair wash included', 'Styling tips'],
                duration: '1-2 hours'
            },
            {
                id: 8,
                name: 'Full Body Massage',
                description: 'Relaxing full body massage therapy at home',
                price: 100,
                rating: 4.7,
                reviews: 70,
                image: '../assets/services/massage_images.png',
                category: 'beauty',
                features: ['Relaxation therapy', 'Professional massage', 'Quality oils', 'Stress relief'],
                duration: '1-2 hours'
            },
            {
                id: 9,
                name: 'AC Repair',
                description: 'Fix and service air conditioning units',
                price: 75,
                rating: 4.6,
                reviews: 70,
                image: 'https://5.imimg.com/data5/SELLER/Default/2022/1/MV/DV/GX/144990520/new-product-500x500.jpeg',
                category: 'repair',
                features: ['Complete diagnosis', 'Gas refilling', 'Filter cleaning', 'Performance check'],
                duration: '2-3 hours'
            },
            {
                id: 10,
                name: 'Kitchen Chimney Cleaning',
                description: 'Deep cleaning of kitchen chimneys to remove grease and soot',
                price: 100,
                rating: 4.7,
                reviews: 85,
                image: 'https://5.imimg.com/data5/SELLER/Default/2024/3/401808890/WR/UK/BU/14823340/kitchen-chimney-cleaning-service.jpg',
                category: 'cleaning',
                features: ['Grease removal', 'Filter cleaning', 'Motor servicing', 'Performance improvement'],
                duration: '2-3 hours'
            },
            {
                id: 11,
                name: 'Pest Control (Cockroach)',
                description: 'Treatment to remove cockroaches from home',
                price: 150,
                rating: 4.7,
                reviews: 110,
                image: 'https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/67a9ce46c35314001d3a5c28.jpg',
                category: 'home',
                features: ['Safe chemicals', 'Long-lasting effect', 'All areas covered', '3 months warranty'],
                duration: '2-4 hours'
            },
            {
                id: 12,
                name: 'Pest Control (Termite)',
                description: 'Termite control service with safe chemicals',
                price: 200,
                rating: 4.9,
                reviews: 100,
                image: 'https://www.getpestcontrol.in/wp-content/uploads/2020/11/termite-pest-control-1.jpg',
                category: 'home',
                features: ['Pre-construction treatment', 'Post-construction care', 'Chemical barrier', '5 years warranty'],
                duration: '4-6 hours'
            },
            {
                id: 13,
                name: 'AC Service',
                description: 'Routine service of window and split AC units',
                price: 100,
                rating: 4.8,
                reviews: 130,
                image: 'https://static.wixstatic.com/media/ade29c_24e1ba8f67a241b5a6a44f04a96fdbd0~mv2.png/v1/fill/w_556,h_366,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/ade29c_24e1ba8f67a241b5a6a44f04a96fdbd0~mv2.png',
                category: 'repair',
                features: ['Filter cleaning', 'Gas check', 'Coil cleaning', 'Performance optimization'],
                duration: '1-2 hours'
            },
            {
                id: 14,
                name: 'Refrigerator Repair',
                description: 'Servicing and minor repairs of refrigerators',
                price: 100,
                rating: 4.6,
                reviews: 100,
                image: 'https://www.revampservice.com/web-assets/images/fridge-repair1.jpg',
                category: 'repair',
                features: ['Cooling check', 'Component repair', 'Gas refilling', 'Temperature calibration'],
                duration: '2-3 hours'
            },
            {
                id: 15,
                name: 'Geyser Installation',
                description: 'Installing new water geyser systems',
                price: 100,
                rating: 4.7,
                reviews: 80,
                image: 'https://www.jaquar.com/images/uploaded/4%20innovative/10%20steps%20to%20install%20water%20heater%20yourself/image4.jpg',
                category: 'repair',
                features: ['Professional installation', 'Safety valve setup', 'Plumbing connection', 'Testing included'],
                duration: '2-3 hours'
            },
            {
                id: 16,
                name: 'CCTV Installation',
                description: 'Installation of CCTV cameras for home security',
                price: 250,
                rating: 4.8,
                reviews: 65,
                image: 'https://www.raypid.com/assets/images/cctvcaminstall.jpg',
                category: 'home',
                features: ['HD cameras', 'Night vision', 'Mobile app setup', 'Storage configuration'],
                duration: '4-6 hours'
            },
            {
                id: 17,
                name: 'Mobile Repair',
                description: 'Mobile device repair and screen replacement',
                price: 100,
                rating: 4.7,
                reviews: 85,
                image: 'https://static.vecteezy.com/system/resources/previews/017/153/701/non_2x/technician-repairing-inside-of-mobile-phone-integrated-circuit-the-concept-of-data-hardware-technology-photo.jpg',
                category: 'repair',
                features: ['Screen replacement', 'Software issues', 'Hardware repair', 'Data recovery'],
                duration: '1-3 hours'
            },
            {
                id: 18,
                name: 'AC Gas Filling',
                description: 'Refill gas in air conditioning units for optimal cooling',
                price: 120,
                rating: 4.5,
                reviews: 75,
                image: 'https://img.clevup.in/298336/1707333809053_SKU-0005_2.jpg?width=600&format=webp',
                category: 'repair',
                features: ['Gas level check', 'Leak detection', 'Quality refrigerant', 'Performance testing'],
                duration: '1-2 hours'
            },
            {
                id: 19,
                name: 'Curtain Cleaning',
                description: 'Professional cleaning of curtains and drapes',
                price: 80,
                rating: 4.6,
                reviews: 60,
                image: 'https://thehealthyhome.me/img/e2b70d79-fd7f-4069-be28-09955ffb3250/curtain-cleaning-blinds-service.jpg?fm=jpg&q=80&fit=max&crop=2000%2C1333%2C0%2C0',
                category: 'cleaning',
                features: ['Fabric care', 'Stain removal', 'Fresh fragrance', 'Dry cleaning option'],
                duration: '2-3 hours'
            },
            {
                id: 20,
                name: 'Doorbell Installation',
                description: 'Install and configure smart doorbells',
                price: 90,
                rating: 4.7,
                reviews: 45,
                image: 'https://i.ytimg.com/vi/TwPS46AZy2o/maxresdefault.jpg',
                category: 'home',
                features: ['Smart connectivity', 'Video recording', 'Mobile alerts', 'Wiring setup'],
                duration: '1-2 hours'
            },
            {
                id: 21,
                name: 'Geyser Repair',
                description: 'Repair and maintenance of water heating systems',
                price: 80,
                rating: 4.5,
                reviews: 90,
                image: 'https://5.imimg.com/data5/SELLER/Default/2024/6/428494145/PW/WN/EN/224054708/geyser-repair-service-500x500.jpg',
                category: 'repair',
                features: ['Element replacement', 'Thermostat check', 'Safety valve repair', 'Temperature calibration'],
                duration: '1-2 hours'
            },
            {
                id: 22,
                name: 'Inverter Installation',
                description: 'Install and configure home power inverters',
                price: 200,
                rating: 4.8,
                reviews: 55,
                image: 'https://media.gettyimages.com/id/547270790/video/workers-assemble-solar-inverters-on-a-production-line-of-the-su-kam-power-systems-ltd-factory.jpg?s=640x640&k=20&c=bya9mLwtKaTrQpNKbC8ijTABI1cBlHzgFLyy6zY-lHM=',
                category: 'home',
                features: ['Battery connection', 'Load calculation', 'Safety wiring', 'Testing included'],
                duration: '3-4 hours'
            },
            {
                id: 23,
                name: 'Mattress Cleaning',
                description: 'Deep cleaning and sanitization of mattresses',
                price: 90,
                rating: 4.6,
                reviews: 80,
                image: 'https://5.imimg.com/data5/SELLER/Default/2021/11/QI/ZJ/BB/142132883/mattress-cleaning-service.jpg',
                category: 'cleaning',
                features: ['Dust mite removal', 'Stain cleaning', 'Sanitization', 'Odor elimination'],
                duration: '2-3 hours'
            },
            {
                id: 24,
                name: 'Microwave Repair',
                description: 'Repair and service microwave ovens',
                price: 85,
                rating: 4.4,
                reviews: 65,
                image: 'https://vraservicecare.businesswebsite.in/wp-content/uploads/2023/10/Microwave-oven-repair-and-service.jpg',
                category: 'repair',
                features: ['Component diagnosis', 'Magnetron repair', 'Door seal check', 'Safety testing'],
                duration: '1-2 hours'
            },
            {
                id: 25,
                name: 'Sofa Shampooing',
                description: 'Professional shampooing and cleaning of sofas',
                price: 120,
                rating: 4.7,
                reviews: 95,
                image: 'https://safaiwale.in/wp-content/uploads/2020/01/furniture-cleaning-vacuum-cleaner.jpg',
                category: 'cleaning',
                features: ['Deep fabric cleaning', 'Stain removal', 'Quick drying', 'Fabric protection'],
                duration: '2-4 hours'
            },
            {
                id: 26,
                name: 'Washing Machine Repair',
                description: 'Repair and maintenance of washing machines',
                price: 100,
                rating: 4.6,
                reviews: 110,
                image: 'https://sewamitra.up.gov.in/Upload/Service/c3b1c209-344a-4c59-ae2c-ec81fd171b55_.jpg',
                category: 'repair',
                features: ['Drum cleaning', 'Motor repair', 'Pipe checking', 'Performance optimization'],
                duration: '2-3 hours'
            },
            {
                id: 27,
                name: 'Water Tank Cleaning',
                description: 'Thorough cleaning and sanitization of water tanks',
                price: 150,
                rating: 4.8,
                reviews: 70,
                image: 'https://5.imimg.com/data5/SELLER/Default/2024/5/421841948/DJ/PQ/SL/41677061/domestic-water-tank-cleaning-service.jpg',
                category: 'cleaning',
                features: ['Complete drainage', 'Scrubbing & cleaning', 'Disinfection', 'Quality testing'],
                duration: '3-5 hours'
            }
        ];

        renderServices();
    }

    function filterServices() {
        const filteredServices = currentFilter === 'all' 
            ? allServices 
            : allServices.filter(service => service.category === currentFilter);
        
        renderServices(filteredServices);
    }

    function renderServices(services = allServices) {
        const serviceGrid = document.getElementById('serviceGrid');
        
        if (services.length === 0) {
            serviceGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No services found</h4>
                    <p class="text-muted">Try adjusting your filters</p>
                </div>
            `;
            return;
        }

        serviceGrid.innerHTML = services.map(service => `
            <div class="service-item" data-category="${service.category}" data-aos="fade-up">
                <div class="service-card" onclick="showServiceDetail(${service.id})">
                    <div class="service-image">
                        <img src="${service.image}" alt="${service.name}">
                    </div>
                    <div class="service-content">
                        <h3 class="service-title">${service.name}</h3>
                        <p class="service-description">${service.description}</p>
                        <div class="service-rating">
                            <span class="stars">${'★'.repeat(Math.floor(service.rating))}${'☆'.repeat(5 - Math.floor(service.rating))}</span>
                            <span class="rating-text">${service.rating} (${service.reviews} reviews)</span>
                        </div>
                        <div class="service-price">Visit Price: <span class="price">₹${service.price}</span></div>
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); bookService(${service.id})">Book Now</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Refresh AOS
        AOS.refresh();
    }

    window.showServiceDetail = function(serviceId) {
        const service = allServices.find(s => s.id === serviceId);
        if (!service) return;

        // Populate modal
        document.getElementById('modalServiceTitle').textContent = service.name;
        document.getElementById('modalServiceImage').src = service.image;
        document.getElementById('modalServiceName').textContent = service.name;
        document.getElementById('modalServiceDescription').textContent = service.description;
        document.getElementById('modalServiceRating').textContent = '★'.repeat(Math.floor(service.rating)) + '☆'.repeat(5 - Math.floor(service.rating));
        document.getElementById('modalServiceReviews').textContent = `${service.rating} (${service.reviews} reviews)`;
        document.getElementById('modalServicePrice').textContent = `₹${service.price}`;

        // Populate features
        const featuresList = document.getElementById('modalServiceFeatures');
        featuresList.innerHTML = service.features.map(feature => `<li>${feature}</li>`).join('');

        // Store current service for booking
        window.currentServiceForBooking = service;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('serviceDetailModal'));
        modal.show();
    };

    window.bookService = function(serviceId) {
        const service = serviceId ? allServices.find(s => s.id === serviceId) : window.currentServiceForBooking;
        if (!service) {
            console.error('No service found for booking');
            return;
        }

        console.log('Booking service:', service);
        
        // Store selected service in localStorage
        localStorage.setItem('selectedService', JSON.stringify(service));
        
        // Redirect to booking page
        window.location.href = 'booking.html';
    };

    // Search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search services...';
    searchInput.className = 'form-control mb-3';
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredServices = allServices.filter(service => 
            service.name.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query)
        );
        renderServices(filteredServices);
    });

    // Add search to filter section
    const filterSection = document.querySelector('.service-filter');
    if (filterSection) {
        filterSection.parentNode.insertBefore(searchInput, filterSection.nextSibling);
    }

    console.log('Services page initialized successfully!');
});
