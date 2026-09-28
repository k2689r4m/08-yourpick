<template>
	<div class="container">
		<div class="section">
			<div class="my-tit m-b--0">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				결제 내역
			</div>
			<div class="p-b--10 txt-right m-t---20">
				<button type="button" class="btn btn-normal btn-line">선택 삭제</button>
			</div>
			<div class="table-wrap">
				<table class="table text-center">
					<tr>
						<th>
							<label class="input-checkbox">
								<input type="checkbox" />
								<span class="box"></span>
							</label>
						</th>
						<th>상품명</th>
						<th>결제일</th>
						<th>결제 수단</th>
						<th>처리상태</th>
					</tr>
					<tr>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" />
								<span class="box"></span>
							</label>
						</td>
						<td>안심거래리포트 30건 패키지</td>
						<td>2022.10.01</td>
						<td>간편결제 - 카카오페이</td>
						<td>발급완료</td>
					</tr>
					<tr>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" />
								<span class="box"></span>
							</label>
						</td>
						<td>안심거래리포트 30건 패키지</td>
						<td>2022.10.01</td>
						<td>간편결제 - 카카오페이</td>
						<td>발급완료</td>
					</tr>
					<tr>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" />
								<span class="box"></span>
							</label>
						</td>
						<td>안심거래리포트 30건 패키지</td>
						<td>2022.10.01</td>
						<td>간편결제 - 카카오페이</td>
						<td>발급완료</td>
					</tr>
				</table>
				<!-- 리스트 없을시 -->
				<!-- <div class="p-60 txt-c--grey txt-size--15 txt-center">
                결제 내역이 없습니다.
            </div> -->
			</div>

			<div class="pagination">
				<button type="button" class="btn first" disabled></button>
				<button type="button" class="btn prev" disabled></button>
				<button type="button" class="btn num active">1</button>
				<button type="button" class="btn num">2</button>
				<button type="button" class="btn num">3</button>
				<span class="more">...</span>
				<button type="button" class="btn num">6</button>
				<button type="button" class="btn next"></button>
				<button type="button" class="btn last"></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Main',
	components: {},
	computed: {},
	data() {
		return {};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
