<style scoped>
.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
}
</style>

<template>
    <div class="d-flex">
        <div class="d-flex main justify-content-center align-items-center">
            <div class="d-flex flex-column">
                <span class="mb-3" style="font-weight: bold; font-size: 34px; color:#444">404 Page Not Found</span>
                <span style="font-weight: lighter; font-size: 14px; color:#444">
                    요청하신 페이지를 찾을 수 없습니다. <br/>
                    올바른 주소가 입력되었는지 확인해주세요.
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '404',
}
</script>