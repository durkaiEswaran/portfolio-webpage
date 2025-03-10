document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const navbar = document.querySelector(".navbar");
    const scrollTop = document.getElementById("scroll-top");
    const contactForm = document.getElementById("contact-form");

    if (menu) {
        menu.addEventListener("click", function () {
            this.classList.toggle("fa-times");
            navbar.classList.toggle("nav-toggle");
        });
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);

    function handleScroll() {
        if (menu) menu.classList.remove("fa-times");
        if (navbar) navbar.classList.remove("nav-toggle");
        
        if (window.scrollY > 60) {
            scrollTop.classList.add("active");
        } else {
            scrollTop.classList.remove("active");
        }

        document.querySelectorAll("section").forEach(section => {
            let height = section.offsetHeight;
            let offset = section.offsetTop - 200;
            let top = window.scrollY;
            let id = section.getAttribute("id");

            if (top > offset && top < offset + height) {
                document.querySelectorAll(".navbar ul li a").forEach(link => {
                    link.classList.remove("active");
                });
                let activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | durkai eswaran";
            document.getElementById("favicon").setAttribute("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            document.getElementById("favicon").setAttribute("href", "assets/images/favhand.png");
        }
    });

    var typed = new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "full stack development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    async function fetchData(type = "skills") {
        let response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
        return await response.json();
    }

    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        skillsContainer.innerHTML = skills.map(skill => `
            <div class="bar">
                <div class="info">
                    <img src=${skill.icon} alt="skill" />
                    <span>${skill.name}</span>
                </div>
            </div>`).join('');
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        projectsContainer.innerHTML = projects.slice(0, 10).filter(project => project.category !== "android").map(project => `
            <div class="box tilt">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>`).join('');

        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
        srtop.reveal('.work .box', { interval: 200 });
    }

    fetchData().then(showSkills);
    fetchData("projects").then(showProjects);

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    document.onkeydown = function (e) {
        if ([123, 73, 67, 74, 85].includes(e.keyCode) && (e.ctrlKey || e.shiftKey)) {
            return false;
        }
    };

    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/67ce76432dc557190e95ca1e/1ilv7ru6h';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();

    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });
    srtop.reveal('.work .box', { interval: 200 });
});

    (function(){
        emailjs.init({
            publicKey: "G_NJE-toaeZnb_4Q4",
        });
    })();

    (function(){
        emailjs.init({
            publicKey: "G_NJE-toaeZnb_4Q4",
        });
    })();

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();

        let params = {
            form_name: document.querySelector('input[name="name"]').value,
            email_id: document.querySelector('input[name="email"]').value,
            message: document.querySelector('textarea[name="message"]').value
        };

        console.log(params);

        emailjs.send("service_n1idmpp", "template_fy8fd7o", params)
            .then(() => {
                alert("Email sent successfully!");
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
            });
    });

